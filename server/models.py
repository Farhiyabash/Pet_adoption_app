from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

# User model
class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)  # Storing hashed passwords
    pets = db.relationship('Pet', backref='owner', lazy=True)  # One-to-Many relationship
    adoptions = db.relationship('Adoption', backref='user', lazy=True)  # Many-to-Many relationship

    def __repr__(self):
        return f'<User {self.name}>'

# Breed model
class Breed(db.Model):
    __tablename__ = 'breeds'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    pets = db.relationship('Pet', backref='breed', lazy=True)  # One-to-Many relationship

    def __repr__(self):
        return f'<Breed {self.name}>'

# Shelter model
class Shelter(db.Model):
    __tablename__ = 'shelters'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    pets = db.relationship('Pet', backref='shelter', lazy=True)  # One-to-Many relationship

    def __repr__(self):
        return f'<Shelter {self.name}>'

# Pet model
class Pet(db.Model):
    __tablename__ = 'pets'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    description = db.Column(db.Text, nullable=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # Foreign key for owner
    breed_id = db.Column(db.Integer, db.ForeignKey('breeds.id'), nullable=False)  # Foreign key for breed
    shelter_id = db.Column(db.Integer, db.ForeignKey('shelters.id'), nullable=False)  # Foreign key for shelter
    adoptions = db.relationship('Adoption', backref='pet', lazy=True)  # Many-to-Many relationship with User through Adoption

    def __repr__(self):
        return f'<Pet {self.name}>'

# Adoption model (many-to-many relationship)
class Adoption(db.Model):
    __tablename__ = 'adoptions'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    pet_id = db.Column(db.Integer, db.ForeignKey('pets.id'), nullable=False)
    date_adopted = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)  # Date of adoption
    adoption_reason = db.Column(db.String(255), nullable=True)  # Reason for adoption
    
    def __repr__(self):
        return f'<Adoption User {self.user_id} - Pet {self.pet_id}>'

# Review model
class Review(db.Model):
    __tablename__ = 'reviews'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # Foreign key for user
    pet_id = db.Column(db.Integer, db.ForeignKey('pets.id'), nullable=False)  # Foreign key for pet
    rating = db.Column(db.Integer, nullable=False)  # Rating from 1 to 5
    comment = db.Column(db.Text, nullable=True)  # User's comment
    date_created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)  # Date of review

    def __repr__(self):
        return f'<Review User {self.user_id} - Pet {self.pet_id}>'

# Appointment model
class Appointment(db.Model):
    __tablename__ = 'appointments'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # Foreign key for user
    pet_id = db.Column(db.Integer, db.ForeignKey('pets.id'), nullable=False)  # Foreign key for pet
    appointment_date = db.Column(db.DateTime, nullable=False)  # Scheduled date
    reason = db.Column(db.String(255), nullable=True)  # Reason for the appointment

    def __repr__(self):
        return f'<Appointment User {self.user_id} - Pet {self.pet_id}>'
