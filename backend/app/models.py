from .extensions import db
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

# --------------- USER MODEL ---------------
class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)
    last_login = db.Column(db.DateTime, nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'last_login': self.last_login
        }

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)


# --------------- PET MODEL ---------------
class Pet(db.Model):
    __tablename__ = 'pets'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    description = db.Column(db.Text, nullable=True)
    pet_type_id = db.Column(db.Integer, db.ForeignKey('pet_types.id'), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    pet_type = db.relationship('PetType', backref='pets')
    owner = db.relationship('User', backref='pets')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'age': self.age,
            'description': self.description,
            'pet_type_id': self.pet_type_id,
            'owner_id': self.owner_id
        }


# --------------- BREED MODEL ---------------
class Breed(db.Model):
    __tablename__ = 'breeds'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }


# --------------- PET TYPE MODEL ---------------
class PetType(db.Model):
    __tablename__ = 'pet_types'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }


# --------------- ADOPTION REQUEST MODEL ---------------
class AdoptionRequest(db.Model):
    __tablename__ = 'adoption_requests'

    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.Text, nullable=False)  # Ensure this field exists
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    pet_id = db.Column(db.Integer, db.ForeignKey('pets.id'), nullable=False)
    status = db.Column(db.String(50), nullable=False, default='pending')

    user = db.relationship('User', backref='adoption_requests')
    pet = db.relationship('Pet', backref='adoption_requests')

    def to_dict(self):
        return {
            'id': self.id,
            'message': self.message,  # Include this field
            'user_id': self.user_id,
            'pet_id': self.pet_id,
            'status': self.status
        }


# --------------- REVIEW MODEL ---------------
class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    pet_id = db.Column(db.Integer, db.ForeignKey('pets.id'), nullable=False)

    user = db.relationship('User', backref='reviews')
    pet = db.relationship('Pet', backref='reviews')

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'rating': self.rating,
            'user_id': self.user_id,
            'pet_id': self.pet_id
        }


# --------------- REPLY MODEL ---------------
class Reply(db.Model):
    __tablename__ = 'replies'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    review_id = db.Column(db.Integer, db.ForeignKey('reviews.id'), nullable=False)

    user = db.relationship('User', backref='replies')
    review = db.relationship('Review', backref='replies')

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'user_id': self.user_id,
            'review_id': self.review_id
        }
