from marshmallow import Schema, fields, validate, post_load
from models import User, Pet, Breed, Shelter, Adoption, Review, Appointment

# This schema handles serializing and deserializing User data.
class UserSchema(Schema):
    id = fields.Int(dump_only=True)  # The ID is read-only, assigned by the database.
    username = fields.Str(required=True, validate=validate.Length(min=1))  # Username is required and cannot be empty.
    email = fields.Email(required=True)  # Email is required and must follow the correct format.
    pets = fields.List(fields.Nested('PetSchema', exclude=('owner',)))  # Pets owned by the user.

    @post_load
    def make_user(self, data: dict, **kwargs) -> User:
        return User(**data)  # Create a User object from validated data.

# This schema handles pets, including validation of required fields like name, age, and foreign keys.
class PetSchema(Schema):
    id = fields.Int(dump_only=True)  # Pet ID is assigned by the database and is read-only.
    name = fields.Str(required=True, validate=validate.Length(min=1))  # Name is required and must not be empty.
    age = fields.Int(required=True)  # Age is required and should be an integer.
    description = fields.Str(missing=None)  # Optional field for a description of the pet.
    breed_id = fields.Int(required=True)  # A pet must have a breed (foreign key).
    shelter_id = fields.Int(required=True)  # A pet must belong to a shelter (foreign key).
    owner_id = fields.Int(required=True)  # Each pet must have an owner (foreign key).
    adoption_info = fields.Nested('AdoptionSchema', exclude=('pet',))  # Adoption info for the pet.

    @post_load
    def make_pet(self, data: dict, **kwargs) -> Pet:
        return Pet(**data)  # Create a Pet object from validated data.

# Simple schema for Breed, which only requires a name.
class BreedSchema(Schema):
    id = fields.Int(dump_only=True)  # Breed ID is assigned by the database and is read-only.
    name = fields.Str(required=True)  # Breed name is required.

    @post_load
    def make_breed(self, data: dict, **kwargs) -> Breed:
        return Breed(**data)  # Create a Breed object from validated data.

# Shelter schema, which includes an optional address field for more detailed shelter info.
class ShelterSchema(Schema):
    id = fields.Int(dump_only=True)  # Shelter ID is assigned by the database and is read-only.
    name = fields.Str(required=True)  # Shelter name is required.
    address = fields.Str(missing=None)  # Optional field for the shelter's address.

    @post_load
    def make_shelter(self, data: dict, **kwargs) -> Shelter:
        return Shelter(**data)  # Create a Shelter object from validated data.

# Adoption schema defines a many-to-many relationship between users and pets.
class AdoptionSchema(Schema):
    id = fields.Int(dump_only=True)  # Adoption ID is assigned by the database and is read-only.
    user_id = fields.Int(required=True)  # A user must be specified for the adoption.
    pet_id = fields.Int(required=True)  # A pet must be specified for the adoption.
    adoption_reason = fields.Str(required=True, validate=validate.Length(min=5))  # Required reason for adoption.

    @post_load
    def make_adoption(self, data: dict, **kwargs) -> Adoption:
        return Adoption(**data)  # Create an Adoption object from validated data.

# Review schema allows users to leave a review for a pet.
class ReviewSchema(Schema):
    id = fields.Int(dump_only=True)  # Review ID is assigned by the database and is read-only.
    user_id = fields.Int(required=True)  # A user must be specified for the review.
    pet_id = fields.Int(required=True)  # A pet must be specified for the review.
    rating = fields.Int(required=True, validate=validate.Range(min=1, max=5))  # Rating must be between 1 and 5.
    comment = fields.Str(missing=None)  # Optional comment field for additional feedback.

    @post_load
    def make_review(self, data: dict, **kwargs) -> Review:
        return Review(**data)  # Create a Review object from validated data.

# Appointment schema defines a many-to-many relationship between users and pets for scheduling appointments.
class AppointmentSchema(Schema):
    id = fields.Int(dump_only=True)  # Appointment ID is assigned by the database and is read-only.
    user_id = fields.Int(required=True)  # A user must be specified for the appointment.
    pet_id = fields.Int(required=True)  # A pet must be specified for the appointment.
    appointment_date = fields.Date(required=True)  # The appointment date is required.

    @post_load
    def make_appointment(self, data: dict, **kwargs) -> Appointment:
        return Appointment(**data)  # Create an Appointment object from validated data.
