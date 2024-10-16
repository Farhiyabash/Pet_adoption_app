from flask import Flask
from server.models import db  # Import db from models

class Config:
    SQLALCHEMY_DATABASE_URI = 'sqlite:///app.db'  # Adjust as necessary
    SQLALCHEMY_TRACK_MODIFICATIONS = False

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)  # Load configuration
    db.init_app(app)

    with app.app_context():
        db.create_all()  # Create tables if they don't exist

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)  # Run the app in debug mode
