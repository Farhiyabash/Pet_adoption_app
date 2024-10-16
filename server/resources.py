from flask import Blueprint, request, jsonify
from models import db, User, Pet, Breed, Shelter, Adoption, Review, Appointment
from schemas import UserSchema, PetSchema, BreedSchema, ShelterSchema, AdoptionSchema, ReviewSchema, AppointmentSchema
from marshmallow import ValidationError

# Set up a blueprint for API routes
api = Blueprint('api', __name__)

# Initialize schema instances for validation and serialization
user_schema = UserSchema()
pet_schema = PetSchema()
breed_schema = BreedSchema()
shelter_schema = ShelterSchema()
adoption_schema = AdoptionSchema()
review_schema = ReviewSchema()
appointment_schema = AppointmentSchema()

# -----------------------------------------
# USER ROUTES
# -----------------------------------------

# Create a new user
@api.route('/users', methods=['POST'])
def create_user():
    try:
        # Validate and deserialize input
        user_data = user_schema.load(request.json)
        new_user = User(**user_data)
        db.session.add(new_user)
        db.session.commit()
        return jsonify(user_schema.dump(new_user)), 201  # Return the newly created user data with a 201 status
    except ValidationError as err:
        return jsonify(err.messages), 400  # Return validation errors with a 400 status

# Get all users
@api.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify(user_schema.dump(users, many=True)), 200  # Serialize and return all users

# Get a specific user by ID
@api.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get_or_404(user_id)  # Return a 404 if user not found
    return jsonify(user_schema.dump(user)), 200

# -----------------------------------------
# PET ROUTES
# -----------------------------------------

# Create a new pet
@api.route('/pets', methods=['POST'])
def create_pet():
    try:
        # Validate and deserialize input
        pet_data = pet_schema.load(request.json)
        new_pet = Pet(**pet_data)
        db.session.add(new_pet)
        db.session.commit()
        return jsonify(pet_schema.dump(new_pet)), 201
    except ValidationError as err:
        return jsonify(err.messages), 400

# Get all pets
@api.route('/pets', methods=['GET'])
def get_pets():
    pets = Pet.query.all()
    return jsonify(pet_schema.dump(pets, many=True)), 200

# Get a specific pet by ID
@api.route('/pets/<int:pet_id>', methods=['GET'])
def get_pet(pet_id):
    pet = Pet.query.get_or_404(pet_id)
    return jsonify(pet_schema.dump(pet)), 200

# Update a pet
@api.route('/pets/<int:pet_id>', methods=['PUT'])
def update_pet(pet_id):
    pet = Pet.query.get_or_404(pet_id)
    try:
        # Validate and deserialize input
        pet_data = pet_schema.load(request.json, partial=True)  # partial=True allows for partial updates
        for key, value in pet_data.items():
            setattr(pet, key, value)
        db.session.commit()
        return jsonify(pet_schema.dump(pet)), 200
    except ValidationError as err:
        return jsonify(err.messages), 400

# Delete a pet
@api.route('/pets/<int:pet_id>', methods=['DELETE'])
def delete_pet(pet_id):
    pet = Pet.query.get_or_404(pet_id)
    db.session.delete(pet)
    db.session.commit()
    return '', 204  # Return no content, as the deletion was successful

# -----------------------------------------
# BREED ROUTES
# -----------------------------------------

# Get all breeds
@api.route('/breeds', methods=['GET'])
def get_breeds():
    breeds = Breed.query.all()
    return jsonify(breed_schema.dump(breeds, many=True)), 200

# -----------------------------------------
# SHELTER ROUTES
# -----------------------------------------

# Create a new shelter
@api.route('/shelters', methods=['POST'])
def create_shelter():
    try:
        shelter_data = shelter_schema.load(request.json)
        new_shelter = Shelter(**shelter_data)
        db.session.add(new_shelter)
        db.session.commit()
        return jsonify(shelter_schema.dump(new_shelter)), 201
    except ValidationError as err:
        return jsonify(err.messages), 400

# Get all shelters
@api.route('/shelters', methods=['GET'])
def get_shelters():
    shelters = Shelter.query.all()
    return jsonify(shelter_schema.dump(shelters, many=True)), 200

# -----------------------------------------
# ADOPTION ROUTES
# -----------------------------------------

# Create a new adoption
@api.route('/adoptions', methods=['POST'])
def create_adoption():
    try:
        adoption_data = adoption_schema.load(request.json)
        new_adoption = Adoption(**adoption_data)
        db.session.add(new_adoption)
        db.session.commit()
        return jsonify(adoption_schema.dump(new_adoption)), 201
    except ValidationError as err:
        return jsonify(err.messages), 400

# Get all adoptions
@api.route('/adoptions', methods=['GET'])
def get_adoptions():
    adoptions = Adoption.query.all()
    return jsonify(adoption_schema.dump(adoptions, many=True)), 200

# -----------------------------------------
# REVIEW ROUTES
# -----------------------------------------

# Create a new review
@api.route('/reviews', methods=['POST'])
def create_review():
    try:
        review_data = review_schema.load(request.json)
        new_review = Review(**review_data)
        db.session.add(new_review)
        db.session.commit()
        return jsonify(review_schema.dump(new_review)), 201
    except ValidationError as err:
        return jsonify(err.messages), 400

# Get all reviews
@api.route('/reviews', methods=['GET'])
def get_reviews():
    reviews = Review.query.all()
    return jsonify(review_schema.dump(reviews, many=True)), 200

# -----------------------------------------
# APPOINTMENT ROUTES
# -----------------------------------------

# Create a new appointment
@api.route('/appointments', methods=['POST'])
def create_appointment():
    try:
        appointment_data = appointment_schema.load(request.json)
        new_appointment = Appointment(**appointment_data)
        db.session.add(new_appointment)
        db.session.commit()
        return jsonify(appointment_schema.dump(new_appointment)), 201
    except ValidationError as err:
        return jsonify(err.messages), 400

# Get all appointments
@api.route('/appointments', methods=['GET'])
def get_appointments():
    appointments = Appointment.query.all()
    return jsonify(appointment_schema.dump(appointments, many=True)), 200
