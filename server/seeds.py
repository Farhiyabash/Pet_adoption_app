from server import create_app, db
from server.models import User, Shelter, PetType, Pet, AdoptionRequest
from datetime import datetime
from flask_bcrypt import generate_password_hash

app = create_app()

def seed_data():
    with app.app_context():
        # Check if the data already exists to avoid duplication
        if User.query.count() == 0:
            user = User(
                name='Admin',
                email='admin@example.com',
                password=generate_password_hash('admin123').decode('utf-8'),
                phone_number='123-456-7890',
                address='123 Admin St, Pet City'
            )
            db.session.add(user)

        if Shelter.query.count() == 0:
            shelter = Shelter(
                name='Happy Tails',
                location='Pet City',
                contact_info='555-1234',
                website='http://happytails.com'
            )
            db.session.add(shelter)

        if PetType.query.count() == 0:
            pet_type_dog = PetType(type_name='Dog', description='Friendly and loyal companions')
            pet_type_cat = PetType(type_name='Cat', description='Independent and curious animals')
            db.session.add(pet_type_dog)
            db.session.add(pet_type_cat)

        if Pet.query.count() == 0:
            pet = Pet(
                name='Fido',
                age=3,
                gender='Male',
                shelter_id=1,
                pet_type_id=1,
                description='A playful and energetic dog.',
                image_url='http://placekitten.com/200/300',
                status='Available'
            )
            db.session.add(pet)

        db.session.commit()
        print("Seed data created successfully.")

if __name__ == "__main__":
    seed_data()
