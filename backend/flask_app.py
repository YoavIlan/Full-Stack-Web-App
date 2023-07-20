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
    
@app.route('/api/getproj/<projectid>')
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

    

if __name__ == '__main__':
    app.run(debug=True)