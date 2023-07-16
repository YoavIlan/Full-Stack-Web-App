from flask import Flask

app = Flask(__name__)

# @app.route("/")
# def hello_world():
#     return "<p>Hello, World!</p>"

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
    
if __name__ == '__main__':
    app.run(debug=True)