from flask import Flask
from flask import Blueprint, request, jsonify
from flask_cors import CORS, cross_origin
import uuid
import pymongo
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()
DBSTRING = os.getenv('DBSTRING')
app = Flask(__name__, static_folder='./frontend/apad-react-app/build/', static_url_path='/')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

cluster = MongoClient(DBSTRING)
db = cluster['db']
users_collection = db['users']
resource_collection = db['resources']
project_collection = db['projects']

def _checkin_is_valid(id, transaction):
    """
    Helper to validate check in amount
    id: project id
    transaction: user-requested transaction
    """
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
    
@app.route('/api/adduser', methods=['POST'])
@cross_origin()
def create_user():
    """
    API function to create a new user
    """
    try:
        # get email and password from json payload
        email = request.json['email']
        password = request.json['password']
        # encrypt with uuid5 (SHA-1 encryption)
        email_encrypt = str(uuid.uuid5(uuid.NAMESPACE_URL, email))
        password_encrypt = str(uuid.uuid5(uuid.NAMESPACE_URL, password))
        # save to DB using email as id and password as data
        users_collection.insert_one({'_id': email_encrypt, 'password': password_encrypt})
        # Added a success message when user sign up successfully, and a alert will prompted at the front-end 
        return jsonify({"success": True,
                        "message": 'Sign Up Success!'}), 200
    except Exception as e:
        # Changed it from error to message type so we could use it in the front end alert
        return jsonify({"success": False,
                        "message": 'User already taken!'}), 200        
        # return jsonify({"success": False,
        #                 "error": "User already taken!"}), 200

# get a user and check for email and password matching
@app.route('/api/getuser/<email>/<password>', methods=['GET'])
@cross_origin()
def validate_user(email, password):
    """
    API function to validate user credentials
    email: user email from frontend
    password: user password from frontend
    """
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
        return jsonify({"success": True,
                        "message": 'Log In Success'}), 200
    except Exception as e:
        return f"An error occurred: {e}"
    
@app.route('/api/getresource/<resource>', methods=['GET'])
@cross_origin()
def get_resource(resource):
    """
    API function to get a specified resource
    resource: the name of the resource to retrieve
    """
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
@cross_origin()
def get_resources():
    """
    API function to get a list of all resources in the system
    """
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
@cross_origin()
def get_project(projectid):
    """
    API function to get a specific project
    projectid: the project id by which to look up the project 
    """
    try:
        result = project_collection.find_one({'_id': projectid})
        if result is None:
            return jsonify({'success': False,
                            'message': "No such project"})
        return jsonify({'success': True,
                        'data': result,
                        'message': "Load Projects Success!"})
    except Exception as e:
        return f"An error occurred: {e}"

@app.route('/api/makeproject', methods=['POST'])
@cross_origin()
def create_project():
    """
    API function to create a new project
    """
    try:
        id = request.json['_id']
        name = request.json['name']
        desc = request.json['description']
        resources = {'bikes': 0, 'scooters': 0}
        
        project_collection.insert_one({'_id': id,
                                    'name': name,
                                    'desc': desc,
                                    'resources': resources})
        result = project_collection.find_one({'_id': id})
        
        return jsonify({'success': True,
                        'data': result,
                        "message": "Project Created Successfully"})
    except Exception as e:
        return jsonify({"success": False,
                        "message": "Project ID taken"})


@app.route('/api/checkin', methods=['POST'])
@cross_origin()
def check_in():
    """
    API function to check in resources from a project to the resource pool
    """
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
        return jsonify({'success': True,
                        "message": "Check In Successful"})
    except Exception as e:
        return f"An error occurred: {e}"

@app.route('/api/checkout', methods=['POST'])
@cross_origin()
def check_out():
    """
    API function to check out resources from the resource pool to a project
    """
    try:
        id = request.json['id']
        data = request.json['data']
        # check for negative numbers
        for resource_name, transaction_amt in data.items():
            if transaction_amt < 0 :
                return jsonify({'success': False,
                                'message': 'checkout cannot be negative'})
        resources = [resource for resource in resource_collection.find()]
        for resource in resources:
            resource_id = resource['_id']
            requested_amt = data[resource_id]
            # only allow checking out resource availability amount or less
            transaction_amt = requested_amt if resource['availability'] > requested_amt else resource['availability']
            resource_collection.update_one({'_id': resource_id}, {'$inc': {'availability': -1 * transaction_amt}})
            project_collection.update_one({'_id': id}, {'$inc': {f'resources.{resource_id}': transaction_amt}})
        return jsonify({'success': True,
                        "message": "Check Out Successful"})
    except Exception as e:
        return f"An error occurred: {e}" 

@app.route('/')
@cross_origin()
def index():
    return app.send_static_file('index.html')



if __name__ == '__main__':
    # app.run(debug=True)
    app.run(host='0.0.0.0', debug=False, port=80)