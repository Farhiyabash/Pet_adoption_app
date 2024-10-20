import sys
import os
from faker import Faker
import random
import requests

# Add the project root directory to the Python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import create_app, db
from app.models import User, Pet, Breed, PetType, AdoptionRequest, Favorite

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
            email=fake.unique.email(),  # Ensure unique emails
        )
        user.set_password(fake.password())  # Set password using the method defined in the User model
        db.session.add(user)
        users.append(user)

    db.session.commit()

    # Function to fetch a random image URL from The Dog API or The Cat API
    def fetch_pet_image(pet_type):
        if pet_type.lower() == 'dog':
            response = requests.get("https://dog.ceo/api/breeds/image/random")
            if response.status_code == 200:
                return response.json()['message']
        elif pet_type.lower() == 'cat':
            response = requests.get("https://api.thecatapi.com/v1/images/search")
            if response.status_code == 200:
                return response.json()[0]['url']
        return "https://example.com/default_pet_image.jpg"  # Fallback image URL

    # Seed Pets
    pets = []
    for _ in range(20):  # Create 20 pets
        pet_name = fake.first_name()
        pet_type = random.choice(pet_type_objs)
        pet = Pet(
            name=pet_name,
            age=random.randint(1, 15),  # Age between 1 and 15
            description=fake.text(max_nb_chars=100),
            pet_type_id=pet_type.id,
            owner_id=random.choice(users).id,
            image_url=fetch_pet_image(pet_type.name)  # Fetch a real image URL
        )
        db.session.add(pet)
        pets.append(pet)

    db.session.commit()

    # Seed Adoption Requests
    for _ in range(30):  # Create 30 adoption requests
        adoption_request = AdoptionRequest(
            message=fake.text(max_nb_chars=200),  # Ensure this matches your model
            user_id=random.choice(users).id,
            pet_id=random.choice(pets).id
        )
        db.session.add(adoption_request)

    db.session.commit()

    # Seed Favorites
    for user in users:  # Add favorites for each user
        favorite_pets = random.sample(pets, k=random.randint(1, 5))  # Choose 1 to 5 random pets as favorites
        for pet in favorite_pets:
            favorite = Favorite(user_id=user.id, pet_id=pet.id)
            db.session.add(favorite)

    db.session.commit()

    print("Database seeded successfully!")
