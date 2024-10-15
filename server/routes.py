from flask import jsonify, request
from . import db
from .models import User, Shelter, PetType, Pet, AdoptionRequest
from . import create_app

app = create_app()

# User Routes
@app.route('/api/users', methods=['POST'])
def create_user():
    data = request.get_json()
    new_user = User(
        name=data['name'],
        email=data['email'],
        password=data['password'],  # In a real app, make sure to hash this password
        phone_number=data.get('phone_number'),
        address=data.get('address')
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully!'}), 201

@app.route('/api/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{'id': user.id, 'name': user.name, 'email': user.email} for user in users])

# Shelter Routes
@app.route('/api/shelters', methods=['GET'])
def get_shelters():
    shelters = Shelter.query.all()
    return jsonify([{'id': shelter.id, 'name': shelter.name, 'location': shelter.location} for shelter in shelters])

@app.route('/api/shelters', methods=['POST'])
def create_shelter():
    data = request.get_json()
    new_shelter = Shelter(
        name=data['name'],
        location=data['location'],
        contact_info=data.get('contact_info'),
        website=data.get('website')
    )
    db.session.add(new_shelter)
    db.session.commit()
    return jsonify({'message': 'Shelter created successfully!'}), 201

# Pet Type Routes
@app.route('/api/pet_types', methods=['GET'])
def get_pet_types():
    pet_types = PetType.query.all()
    return jsonify([{'id': pet_type.id, 'type_name': pet_type.type_name} for pet_type in pet_types])

@app.route('/api/pet_types', methods=['POST'])
def create_pet_type():
    data = request.get_json()
    new_pet_type = PetType(
        type_name=data['type_name'],
        description=data.get('description')
    )
    db.session.add(new_pet_type)
    db.session.commit()
    return jsonify({'message': 'Pet type created successfully!'}), 201

# Pet Routes
@app.route('/api/pets', methods=['GET'])
def get_pets():
    pets = Pet.query.all()
    return jsonify([
        {
            'id': pet.id,
            'name': pet.name,
            'age': pet.age,
            'gender': pet.gender,
            'shelter_id': pet.shelter_id,
            'pet_type_id': pet.pet_type_id,
            'description': pet.description,
            'image_url': pet.image_url,
            'status': pet.status
        }
        for pet in pets
    ])

@app.route('/api/pets', methods=['POST'])
def create_pet():
    data = request.get_json()
    new_pet = Pet(
        name=data['name'],
        age=data.get('age'),
        gender=data.get('gender'),
        shelter_id=data['shelter_id'],
        pet_type_id=data['pet_type_id'],
        description=data.get('description'),
        image_url=data.get('image_url'),
        status=data.get('status', 'Available')
    )
    db.session.add(new_pet)
    db.session.commit()
    return jsonify({'message': 'Pet created successfully!'}), 201

# Adoption Request Routes
@app.route('/api/adoption_requests', methods=['GET'])
def get_adoption_requests():
    requests = AdoptionRequest.query.all()
    return jsonify([{
        'id': request.id,
        'user_id': request.user_id,
        'pet_id': request.pet_id,
        'shelter_id': request.shelter_id,
        'request_date': request.request_date,
        'status': request.status
    } for request in requests])

@app.route('/api/adoption_requests', methods=['POST'])
def create_adoption_request():
    data = request.get_json()
    new_request = AdoptionRequest(
        user_id=data['user_id'],
        pet_id=data['pet_id'],
        shelter_id=data['shelter_id'],
        request_date=data.get('request_date'),
        status=data.get('status', 'Pending')
    )
    db.session.add(new_request)
    db.session.commit()
    return jsonify({'message': 'Adoption request created successfully!'}), 201
