from server import create_app, db
from server.models import User, Shelter, Pet, Adoption, Review, Appointment  # Import your models

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)
