from flask import Flask
from .extensions import db
from .models import Pet, User, AdoptionRequest, Breed, PetType
from .routes import routes_app
from flask_migrate import Migrate
from flask_cors import CORS

def create_app():
    app = Flask(__name__)

    # Enable CORS for specific origins without duplicates
    CORS(app, resources={r"*": {"origins": ["http://localhost:3000"]}})

    # Configure the app
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///pets.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialize the database and migrations
    db.init_app(app)
    Migrate(app, db)

    # Register blueprints
    app.register_blueprint(routes_app)

    return app
