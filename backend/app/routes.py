from flask import Blueprint, jsonify, request, abort
from flask_cors import cross_origin
from app.models import Pet, User, AdoptionRequest, Breed, PetType
from app.extensions import db

routes_app = Blueprint('routes_app', __name__)

@routes_app.after_request
@cross_origin()
def add_cors_headers(response):
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

# ---------- LOGIN ROUTE ----------
@routes_app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return abort(400, description="Email and password are required.")

    user = User.query.filter_by(email=email).first()
    if user and user.verify_password(password):
        return jsonify({'email': user.email, 'id': user.id, 'name': user.name}), 200
    else:
        return abort(401, description="Invalid email or password.")

# ---------- PET ROUTES ----------
@routes_app.route('/pets', methods=['GET'])
def get_pets():
    pets = Pet.query.all()
    return jsonify([pet.to_dict() for pet in pets]), 200

@routes_app.route('/pets/<int:id>', methods=['GET'])
def get_pet(id):
    pet = Pet.query.get_or_404(id)
    return jsonify(pet.to_dict()), 200

@routes_app.route('/pets', methods=['POST'])
def create_pet():
    data = request.get_json()
    if not data.get('name') or not data.get('age') or not data.get('pet_type_id') or not data.get('owner_id'):
        return abort(400, description="Missing required fields")
    new_pet = Pet(name=data['name'], age=data['age'], description=data.get('description', ''),
                  pet_type_id=data['pet_type_id'], owner_id=data['owner_id'])
    db.session.add(new_pet)
    db.session.commit()
    return jsonify(new_pet.to_dict()), 201

@routes_app.route('/pets/<int:id>', methods=['PUT'])
def update_pet(id):
    pet = Pet.query.get_or_404(id)
    data = request.get_json()
    pet.name = data.get('name', pet.name)
    pet.age = data.get('age', pet.age)
    pet.description = data.get('description', pet.description)
    pet.pet_type_id = data.get('pet_type_id', pet.pet_type_id)
    pet.owner_id = data.get('owner_id', pet.owner_id)
    db.session.commit()
    return jsonify(pet.to_dict()), 200

@routes_app.route('/pets/<int:id>', methods=['DELETE'])
def delete_pet(id):
    pet = Pet.query.get_or_404(id)
    db.session.delete(pet)
    db.session.commit()
    return jsonify({'message': 'Pet deleted successfully'}), 200

# ---------- USER ROUTES ----------
@routes_app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users]), 200

@routes_app.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get_or_404(id)
    return jsonify(user.to_dict()), 200

@routes_app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    if not data.get('name') or not data.get('email') or not data.get('password'):
        return abort(400, description="Name, email, and password are required.")
    new_user = User(name=data['name'], email=data['email'], password=data['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.to_dict()), 201

@routes_app.route('/users/<int:id>', methods=['PUT'])
def update_user(id):
    user = User.query.get_or_404(id)
    data = request.get_json()
    user.name = data.get('name', user.name)
    user.email = data.get('email', user.email)
    # Note: You might want to add password update logic here
    db.session.commit()
    return jsonify(user.to_dict()), 200

@routes_app.route('/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get_or_404(id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted successfully'}), 200

# ---------- BREED ROUTES ----------
@routes_app.route('/breeds', methods=['GET'])
def get_breeds():
    breeds = Breed.query.all()
    return jsonify([breed.to_dict() for breed in breeds]), 200

@routes_app.route('/breeds/<int:id>', methods=['GET'])
def get_breed(id):
    breed = Breed.query.get_or_404(id)
    return jsonify(breed.to_dict()), 200

@routes_app.route('/breeds', methods=['POST'])
def create_breed():
    data = request.get_json()
    if not data.get('name'):
        return abort(400, description="Breed name is required.")
    new_breed = Breed(name=data['name'])
    db.session.add(new_breed)
    db.session.commit()
    return jsonify(new_breed.to_dict()), 201

@routes_app.route('/breeds/<int:id>', methods=['PUT'])
def update_breed(id):
    breed = Breed.query.get_or_404(id)
    data = request.get_json()
    breed.name = data.get('name', breed.name)
    db.session.commit()
    return jsonify(breed.to_dict()), 200

@routes_app.route('/breeds/<int:id>', methods=['DELETE'])
def delete_breed(id):
    breed = Breed.query.get_or_404(id)
    db.session.delete(breed)
    db.session.commit()
    return jsonify({'message': 'Breed deleted successfully'}), 200

# ---------- PETTYPE ROUTES ----------
@routes_app.route('/pet-types', methods=['GET'])
def get_pet_types():
    pet_types = PetType.query.all()
    return jsonify([pet_type.to_dict() for pet_type in pet_types]), 200

@routes_app.route('/pet-types/<int:id>', methods=['GET'])
def get_pet_type(id):
    pet_type = PetType.query.get_or_404(id)
    return jsonify(pet_type.to_dict()), 200

@routes_app.route('/pet-types', methods=['POST'])
def create_pet_type():
    data = request.get_json()
    if not data.get('name'):
        return abort(400, description="Pet type name is required.")
    new_pet_type = PetType(name=data['name'])
    db.session.add(new_pet_type)
    db.session.commit()
    return jsonify(new_pet_type.to_dict()), 201

@routes_app.route('/pet-types/<int:id>', methods=['PUT'])
def update_pet_type(id):
    pet_type = PetType.query.get_or_404(id)
    data = request.get_json()
    pet_type.name = data.get('name', pet_type.name)
    db.session.commit()
    return jsonify(pet_type.to_dict()), 200

@routes_app.route('/pet-types/<int:id>', methods=['DELETE'])
def delete_pet_type(id):
    pet_type = PetType.query.get_or_404(id)
    db.session.delete(pet_type)
    db.session.commit()
    return jsonify({'message': 'Pet type deleted successfully'}), 200
