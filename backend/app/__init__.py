from flask import Flask
from .extensions import db  # Import db from the new extensions module
from .models import Pet, User, AdoptionRequest, Breed, PetType
from .routes import routes_app
from flask_migrate import Migrate

def create_app():
    app = Flask(__name__)
    
    # Configure the app
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///pets.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialize the database and migrations
    db.init_app(app)
    Migrate(app, db)

    # Register blueprints
    app.register_blueprint(routes_app)

    return app
