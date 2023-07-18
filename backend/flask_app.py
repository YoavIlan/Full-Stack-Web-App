from flask import Flask
from flask import Blueprint, request, jsonify
import uuid
import pymongo
from pymongo import MongoClient

app = Flask(__name__)

cluster = MongoClient('mongodb+srv://YoavIlan:xLibKkRHb1VzAYQN@apad-summer-cluster.18cluv9.mongodb.net/?retryWrites=true&w=majority')
db = cluster['db']
users_collection = db['users']

# create user by posting to adduser api endpoint
@app.route('/adduser', methods=['POST'])
def create_user():
    try:
        # get email and password from json payload
        email = next(iter(request.json))
        password = request.json[email]
        # encrypt with uuid5 (SHA-1 encryption)
        email_encrypt = str(uuid.uuid5(uuid.NAMESPACE_URL, email))
        password_encrypt = str(uuid.uuid5(uuid.NAMESPACE_URL, password))
        # save to DB using email as id and password as data
        users_collection.insert_one({'email': email_encrypt, 'password': password_encrypt})
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An error occurred: {e}"

# get a user and check for email and password matching
@app.route('/getuser/<email>/<password>', methods=['GET'])
def get_user(email, password):
    try:
        # encrypt email and password - this probably should come pre-encrypted to not send raw passwords over API
        email_encrypt = str(uuid.uuid5(uuid.NAMESPACE_URL, email))
        password_encrypt = str(uuid.uuid5(uuid.NAMESPACE_URL, password))
        
        # get the document with the email id
        result = users_collection.find_one({'email': email_encrypt, 'password': password_encrypt})
        # no user found
        if result is None:
            return jsonify({"success": False,
                            "message": 'Wrong username or password'}), 200
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An error occurred: {e}"
    
if __name__ == '__main__':
    app.run(debug=True)