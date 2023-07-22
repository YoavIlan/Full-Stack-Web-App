from flask import Flask
from flask import Blueprint, request, jsonify
import uuid
import pymongo
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()
DBSTRING = os.getenv('DBSTRING')
app = Flask(__name__)

cluster = MongoClient(DBSTRING)
db = cluster['db']
users_collection = db['users']
resource_collection = db['resources']
project_collection = db['projects']

# helper to validate check in amount
def _checkin_is_valid(id, transaction):
    # check for negative transactions
    for _, transaction_amt in transaction.items():
        if transaction_amt < 0:
            return False
    project_resources = get_project(id).json['data']['resources']
    # check user isn't trying to check in more than they have
    for r_name, proj_amt in project_resources.items():
        transaction_amt = transaction[r_name]
        if transaction_amt > proj_amt:
            return False
    return True
    
# create user by posting to adduser api endpoint
@app.route('/api/adduser', methods=['POST'])
def create_user():
    try:
        # get email and password from json payload
        email = request.json['email']
        password = request.json['password']
        # encrypt with uuid5 (SHA-1 encryption)
        email_encrypt = str(uuid.uuid5(uuid.NAMESPACE_URL, email))
        password_encrypt = str(uuid.uuid5(uuid.NAMESPACE_URL, password))
        # save to DB using email as id and password as data
        users_collection.insert_one({'_id': email_encrypt, 'password': password_encrypt})
        return jsonify({"success": True}), 200
    except Exception as e:
        return jsonify({"success": False,
                        "error": "User already taken!"}), 200

# get a user and check for email and password matching
@app.route('/api/getuser/<email>/<password>', methods=['GET'])
def get_user(email, password):
    try:
        # encrypt email and password - this probably should come pre-encrypted to not send raw passwords over API
        email_encrypt = str(uuid.uuid5(uuid.NAMESPACE_URL, email))
        password_encrypt = str(uuid.uuid5(uuid.NAMESPACE_URL, password))
        
        # get the document with the email id
        result = users_collection.find_one({'_id': email_encrypt, 'password': password_encrypt})
        # no user found
        if result is None:
            return jsonify({"success": False,
                            "message": 'Wrong username or password'}), 200
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An error occurred: {e}"
    
# get user with payload instead of url. Better for this purpose of users but can use either
@app.route('/api/v2/getuser', methods=['GET'])
def get_user2():
    try:
        email = request.json['email']
        password = request.json['password']
        # encrypt email and password - this probably should come pre-encrypted to not send raw passwords over API
        email_encrypt = str(uuid.uuid5(uuid.NAMESPACE_URL, email))
        password_encrypt = str(uuid.uuid5(uuid.NAMESPACE_URL, password))
        
        # get the document with the email id
        result = users_collection.find_one({'_id': email_encrypt, 'password': password_encrypt})
        # no user found
        if result is None:
            return jsonify({"success": False,
                            'message': 'Incorrect username or password'}), 500
            
    except Exception as e:
        return f"An error occurred: {e}"

# get a specific resource    
@app.route('/api/getresource/<resource>', methods=['GET'])
def get_resource(resource):
    try:
        # get specific resource
        result = resource_collection.find_one({'_id': resource})
        # return resource
        return jsonify({'success' : True, 
                        'data': result})
    except Exception as e:
        return f"An error occurred: {e}"

# api call to get all resources    
@app.route('/api/getresources', methods=['GET'])
def get_resources():
    try:
        # get all resources
        result = resource_collection.find()
        # put resources in list
        result_list = [r for r in result]
        return jsonify({'success': True,
                        'data': result_list}) 
    except Exception as e:
        return f"An error occurred: {e}"
    
@app.route('/api/getproj/<projectid>', methods=['GET'])
def get_project(projectid):
    try:
        result = project_collection.find_one({'_id': projectid})
        if result is None:
            return jsonify({'success': False,
                            'message': "No such project"})
        return jsonify({'success': True,
                        'data': result})
    except Exception as e:
        return f"An error occurred: {e}"

@app.route('/api/makeproject', methods=['POST'])
def create_project():
    try:
        id = request.json['id']
        name = request.json['name']
        desc = request.json['description']
        resources = {'bikes': 0, 'scooters': 0}
        
        project_collection.insert_one({'_id': id,
                                    'name': name,
                                    'desc': desc,
                                    'resources': resources})
        
        return jsonify({'success': True})
    except Exception as e:
        return f"An error occurred: {e}"

@app.route('/api/checkin', methods=['POST'])
def check_in():
    try:
        id = request.json['id']
        data = request.json['data']
        if not _checkin_is_valid(id, data):
            return jsonify({'success': False,
                            'message': 'invalid check in'})
        resources = [resource['_id'] for resource in resource_collection.find()]
        for resource in resources:
            resource_collection.update_one({'_id': resource}, {'$inc': {'availability': data[resource]}})
            project_collection.update_one({'_id': id}, {'$inc': {f'resources.{resource}': -1 * data[resource]}})
        return jsonify({'success': True})
    except Exception as e:
        return f"An error occurred: {e}"

@app.route('/api/checkout', methods=['POST'])
def check_out():
    try:
        id = request.json['id']
        data = request.json['data']
        resources = [resource for resource in resource_collection.find()]
        #TODO build in error checking
        for resource in resources:
            resource_id = resource['_id']
            resource_collection.update_one({'_id': resource_id}, {'$inc': {'availability': -1 * data[resource_id]}})
            project_collection.update_one({'_id': id}, {'$inc': {f'resources.{resource_id}': data[resource_id]}})
        return jsonify({'success': True})
    except Exception as e:
        return f"An error occurred: {e}" 


        

    

if __name__ == '__main__':
    app.run(debug=True)