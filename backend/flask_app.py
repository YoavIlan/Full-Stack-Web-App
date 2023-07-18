from flask import Flask
from flask import Blueprint, request, jsonify
import uuid
import pymongo
from pymongo import MongoClient

app = Flask(__name__)

cluster = MongoClient('mongodb+srv://YoavIlan:xLibKkRHb1VzAYQN@apad-summer-cluster.18cluv9.mongodb.net/?retryWrites=true&w=majority')
db = cluster['db']
users_collection = db['users']
resource_collection = db['resources']

# create user by posting to adduser api endpoint
@app.route('/api/adduser', methods=['POST'])
def create_user():
    try:
        # get email and password from json payload
        # email = next(iter(request.json))
        # password = request.json[email]
        email = request.json['email']
        password = request.json['password']
        print(email)
        print(password)
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
        print(email)
        print(password)
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
    
# get specific resource
@app.route('/api/getresource/<resource>', methods=['GET'])
def get_resource(resource):
    try:
        result = resource_collection.find_one({'_id': resource})
        return jsonify({"success": True,
                        'data': result}), 200
    except Exception as e:
        return f"An error occurred: {e}"
    
# gets all resources
@app.route('/api/getresources', methods=['GET'])
def get_resources():
    try:
        results = resource_collection.find()
        results_list = [r for r in results]
        return jsonify({"success": True,
                        'data': results_list}), 200
    except Exception as e:
        return f"An error occurred: {e}"
    

    
if __name__ == '__main__':
    app.run(debug=True)