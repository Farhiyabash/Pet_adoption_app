from datetime import datetime, timezone
from . import db

class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    phone_number = db.Column(db.String(15), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, onupdate=lambda: datetime.now(timezone.utc))

class Shelter(db.Model):
    shelter_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(255), nullable=False)
    contact_info = db.Column(db.String(100), nullable=False)
    website = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, onupdate=lambda: datetime.now(timezone.utc))

class Pet(db.Model):
    pet_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    shelter_id = db.Column(db.Integer, db.ForeignKey('shelter.shelter_id'), nullable=False)
    pet_type_id = db.Column(db.Integer, db.ForeignKey('pet_type.pet_type_id'), nullable=False)
    description = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.String(255), nullable=False)
    status = db.Column(db.String(20), nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, onupdate=lambda: datetime.now(timezone.utc))

class PetType(db.Model):
    pet_type_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    type_name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, nullable=False)

class AdoptionRequest(db.Model):
    request_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    pet_id = db.Column(db.Integer, db.ForeignKey('pet.pet_id'), nullable=False)
    shelter_id = db.Column(db.Integer, db.ForeignKey('shelter.shelter_id'), nullable=False)
    request_date = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    status = db.Column(db.String(20), nullable=False)
    response_date = db.Column(db.DateTime, nullable=True)
