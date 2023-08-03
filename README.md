# Advanced Programming and App Development
## MSITM - Summer 2023
### Hannah Clark
### Jeff Wang
### Joel Brisola
### Yoav Ilan
### Martin Dieck
MSITM Summer 23 APAD project.

# Heroku Application
[Group 4 Web App](https://apad-group-four-145d50be0ef9.herokuapp.com)

# Phase 1 Doc
https://docs.google.com/document/d/1v25AP5KafXo_NyCtkffYYFjchhMdrRUKakkkMoPryVc/edit?usp=sharing

# Backend

### Virtual Environment
For development purposes, it is **strongly** recommended that you create a virtual environment. Execute the following commands in your terminal or powershell in the backend directory:

`python -m venv venv`
This will create a virtual environment

`source venv/bin/activate`
This will activate the virtual environment.
(For windows users try: `venv/Scripts/activate` to activate & `venv/Scripts/deactivate` to deactivate)

`pip install -r requirements.txt`
This will install required dependencies


Note: When working in vscode, you may need to set the python interpreter manually. You will know this is the case if vscode doesn't recognize any imports.

Use `cmd + shift + p` to pull up vscode commands. Type in "Python: Select Interpreter"

Copy the full path of the venv interpreter. venv > bin > python. Right click on that and copy full path. Paste into the vscode command, enter, then do that again if needed.

Finally, you will need to put the .env file I sent over WhatsApp in the backend folder. This includes the MongoDB URL and will be used by the flask app to connect to the database.



# Development Best Practices
Never work in the main branch. The dev branch will be where we collectively push our code, and code will only go into the master branch when it is ready for **production**.

The best practice here is to checkout the dev branch, and create a new branch from there, where you can do all of your development. When you have code that's ready to be pushed into the main dev branch you can merge the two branches.
