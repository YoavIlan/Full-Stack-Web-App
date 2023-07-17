from flask import Flask
import firebase_admin
from firebase_admin import credentials, firestore
from flask import Blueprint, request, jsonify
import uuid

app = Flask(__name__)



cred = credentials.Certificate("apad-summer-23-firebase-adminsdk-l6p99-ed2d97db75.json")
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

@app.route('/adduser', methods=['POST'])
def create_user():
    try:
        id = uuid.uuid4()
        users_ref.document(id.hex).set(request.json)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An error occurred: {e}"
    
if __name__ == '__main__':
    app.run(debug=True)