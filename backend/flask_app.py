from flask import Flask
import firebase_admin
from firebase_admin import credentials, firestore
from flask import Blueprint, request, jsonify
import uuid

app = Flask(__name__)



cred = credentials.Certificate("apad-summer-23-firebase-adminsdk-l6p99-717728625b.json")
fb_app = firebase_admin.initialize_app(cred)

#users route
@app.route("/users")
def users():
    return {
        "users":
            [{
              'ilan.yoav@gmail.com': 'abc123',
              'test@test.net': 'aer23',
              'beepbop@gmail.com': 'password'  
            }]
    }
    
db = firestore.client()
users_ref = db.collection('users')
userAPI = Blueprint('userAPI', __name__)

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
        users_ref.document(email_encrypt).set({'password': password_encrypt})
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
        doc_ref = users_ref.document(email_encrypt)
        user = doc_ref.get()
        # username found in db
        if user.exists:
            # password matches
            if user.get('password') == password_encrypt:
                return jsonify({"success": True}), 200
            # password is wrong
            else:
                return jsonify({"success": False,
                                "message": "Wrong password!"}), 500
        # unable to find user
        return jsonify({"success": False,
                        'message': 'No such user!'}), 500
    except Exception as e:
        return f"An error occurred: {e}"
    
if __name__ == '__main__':
    app.run(debug=True)