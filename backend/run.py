from app import create_app, db
from flask_migrate import Migrate
import os

# Initialize the Flask app using the factory pattern
app = create_app()

# Set up Flask-Migrate for database migrations
migrate = Migrate(app, db)

# Ensure that the database tables are created before the first request
with app.app_context():
    db.create_all()  # Creates database tables based on the models

# Start the Flask development server
if __name__ == "__main__":
    # Get the port from environment variables, default to 5000 if not set
    port = int(os.environ.get("PORT", 5000))

    # Run the Flask app
    app.run(host="0.0.0.0", port=port, debug=True)
