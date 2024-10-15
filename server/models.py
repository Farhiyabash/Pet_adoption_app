from . import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    phone_number = db.Column(db.String(15))
    address = db.Column(db.String(200))

    def __repr__(self):
        return f'<User {self.name}>'

class Shelter(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    contact_info = db.Column(db.String(100))
    website = db.Column(db.String(200))

    def __repr__(self):
        return f'<Shelter {self.name}>'

class PetType(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type_name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(200))

    def __repr__(self):
        return f'<PetType {self.type_name}>'

class Pet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer)
    gender = db.Column(db.String(10))
    shelter_id = db.Column(db.Integer, db.ForeignKey('shelter.id'))
    pet_type_id = db.Column(db.Integer, db.ForeignKey('pet_type.id'))
    description = db.Column(db.String(200))
    image_url = db.Column(db.String(200))
    status = db.Column(db.String(20))

    shelter = db.relationship('Shelter', backref='pets')
    pet_type = db.relationship('PetType', backref='pets')

    def __repr__(self):
        return f'<Pet {self.name}>'

class AdoptionRequest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    pet_id = db.Column(db.Integer, db.ForeignKey('pet.id'))
    shelter_id = db.Column(db.Integer, db.ForeignKey('shelter.id'))
    request_date = db.Column(db.DateTime)
    status = db.Column(db.String(20))

    user = db.relationship('User', backref='adoption_requests')
    pet = db.relationship('Pet', backref='adoption_requests')
    shelter = db.relationship('Shelter', backref='adoption_requests')

    def __repr__(self):
        return f'<AdoptionRequest {self.id}>'
