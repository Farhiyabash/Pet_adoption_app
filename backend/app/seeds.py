import sys
import os

# Add the project root directory to the Python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import create_app, db
from app.models import User, Pet, Breed, PetType, AdoptionRequest
from faker import Faker
import random

# Initialize Faker
fake = Faker()

# Create the Flask app context
app = create_app()

with app.app_context():
    # Drop all tables and recreate them (optional)
    db.drop_all()
    db.create_all()

    # Seed PetTypes
    pet_types = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Fish']
    pet_type_objs = []

    for pet_type in pet_types:
        new_pet_type = PetType(name=pet_type)
        db.session.add(new_pet_type)
        pet_type_objs.append(new_pet_type)

    db.session.commit()

    # Seed Breeds
    breeds = ['Golden Retriever', 'Persian Cat', 'Cockatiel', 'Lop-Eared Rabbit', 'Goldfish']
    breed_objs = []

    for breed in breeds:
        new_breed = Breed(name=breed)
        db.session.add(new_breed)
        breed_objs.append(new_breed)

    db.session.commit()

    # Seed Users
    users = []
    for _ in range(10):  # Create 10 users
        user = User(
            name=fake.name(),
            email=fake.email(),
            password=fake.password()  # Random password for each user
        )
        db.session.add(user)
        users.append(user)
    
    db.session.commit()

    # Seed Pets
    pets = []
    for _ in range(20):  # Create 20 pets
        pet = Pet(
            name=fake.first_name(),
            age=random.randint(1, 15),  # Age between 1 and 15
            description=fake.text(max_nb_chars=100),
            pet_type_id=random.choice(pet_type_objs).id,
            owner_id=random.choice(users).id
        )
        db.session.add(pet)
        pets.append(pet)

    db.session.commit()

    # Seed Adoption Requests
    for _ in range(30):  # Create 30 adoption requests
        adoption_request = AdoptionRequest(
            message=fake.text(max_nb_chars=200),
            user_id=random.choice(users).id,
            pet_id=random.choice(pets).id
        )
        db.session.add(adoption_request)

    db.session.commit()

    print("Database seeded successfully!")
