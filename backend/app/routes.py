from flask import Blueprint, jsonify, request, abort
from app.models import Pet, User, AdoptionRequest, Breed, PetType,Review
from app.extensions import db

routes_app = Blueprint('routes_app', __name__)

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
    if not data.get('name') or not data.get('email'):
        return abort(400, description="Name and email are required.")
    new_user = User(name=data['name'], email=data['email'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.to_dict()), 201

@routes_app.route('/users/<int:id>', methods=['PUT'])
def update_user(id):
    user = User.query.get_or_404(id)
    data = request.get_json()
    user.name = data.get('name', user.name)
    user.email = data.get('email', user.email)
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

# ---------- REVIEW ROUTES ----------
@routes_app.route('/reviews', methods=['GET'])
def get_reviews():
    reviews = Review.query.all()
    return jsonify([review.to_dict() for review in reviews]), 200

@routes_app.route('/reviews/<int:id>', methods=['GET'])
def get_review(id):
    review = Review.query.get_or_404(id)
    return jsonify(review.to_dict()), 200

@routes_app.route('/reviews', methods=['POST'])
def create_review():
    data = request.get_json()
    if not data.get('content') or not data.get('rating') or not data.get('user_id') or not data.get('pet_id'):
        return abort(400, description="Missing required fields")
    new_review = Review(content=data['content'], rating=data['rating'], 
                        user_id=data['user_id'], pet_id=data['pet_id'])
    db.session.add(new_review)
    db.session.commit()
    return jsonify(new_review.to_dict()), 201

@routes_app.route('/reviews/<int:id>', methods=['PUT'])
def update_review(id):
    review = Review.query.get_or_404(id)
    data = request.get_json()
    review.content = data.get('content', review.content)
    review.rating = data.get('rating', review.rating)
    db.session.commit()
    return jsonify(review.to_dict()), 200

@routes_app.route('/reviews/<int:id>', methods=['DELETE'])
def delete_review(id):
    review = Review.query.get_or_404(id)
    db.session.delete(review)
    db.session.commit()
    return jsonify({'message': 'Review deleted successfully'}), 200