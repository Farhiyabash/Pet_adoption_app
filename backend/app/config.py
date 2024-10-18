from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS for specific origins
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Make sure to include the following line if you need credentials (cookies, etc.)
# CORS(app, supports_credentials=True)
