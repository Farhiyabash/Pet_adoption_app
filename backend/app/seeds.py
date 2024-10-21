import sys
import os
from faker import Faker
import random

# Add the project root directory to the Python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import create_app, db
from app.models import User, Pet, Breed, PetType, AdoptionRequest, Favorite

# Initialize Faker
fake = Faker()

# Create the Flask app context
app = create_app()

# Define a list of image URLs for different pets (20 images for 20 pets)
pet_images = [
    "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",  # Dog 1
    "https://images.unsplash.com/photo-1489084917528-a57e68a79a1e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",  # Dog 2
    "https://images.unsplash.com/photo-1518288774672-b94e808873ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fHBldHN8ZW58MHx8MHx8fDA%3D",  # Cat 1
    "https://images.unsplash.com/photo-1506242395783-cec2bda110e7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fHBldHN8ZW58MHx8MHx8fDA%3D",  # Cat 2
    "https://images.unsplash.com/photo-1629740067905-bd3f515aa739?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjJ8fHBldHN8ZW58MHx8MHx8fDA%3D",  # Rabbit 1
    "https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fHBldHN8ZW58MHx8MHx8fDA%3D",  # Fish 1
    # Add more images as needed...
]

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
    breeds = [
        'Golden Retriever', 'Labrador', 'Beagle', 'Persian Cat', 
        'Siamese Cat', 'Ragdoll', 'Cockatiel', 'Parakeet'
    ]
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

    # Seed Pets with corresponding image URLs
    pets = []
    for i in range(len(pet_images)):  # Create pets using the number of image URLs available
        pet = Pet(
            name=fake.first_name(),
            age=random.randint(1, 15),  # Age between 1 and 15
            description=fake.text(max_nb_chars=100),
            pet_type_id=random.choice(pet_type_objs).id,
            owner_id=random.choice(users).id,
            image_url=pet_images[i]  # Assign specific image URL
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
