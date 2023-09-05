from flask import Flask

app = Flask(__name__)

from src.algo.all import *

@app.route('/')
def hello_world():  # put application's code here
    # landing page.

    return 'Hello World!'

if __name__ == '__main__':
    app.run()
