from marshmallow import Schema, fields

# --------------- USER SCHEMA ---------------
class UserSchema(Schema):
    id = fields.Int()
    name = fields.Str()
    email = fields.Str()
    last_login = fields.DateTime()

# --------------- PET SCHEMA ---------------
class PetSchema(Schema):
    id = fields.Int()
    name = fields.Str()
    age = fields.Int()
    description = fields.Str()
    pet_type_id = fields.Int()
    owner_id = fields.Int()

# --------------- BREED SCHEMA ---------------
class BreedSchema(Schema):
    id = fields.Int()
    name = fields.Str()

# --------------- PET TYPE SCHEMA ---------------
class PetTypeSchema(Schema):
    id = fields.Int()
    name = fields.Str()

# --------------- ADOPTION REQUEST SCHEMA ---------------
class AdoptionRequestSchema(Schema):
    id = fields.Int()
    user_id = fields.Int()
    pet_id = fields.Int()
    status = fields.Str()

# --------------- REVIEW SCHEMA ---------------
class ReviewSchema(Schema):
    id = fields.Int()
    content = fields.Str()
    rating = fields.Int()
    user_id = fields.Int()
    pet_id = fields.Int()

# --------------- REPLY SCHEMA ---------------
class ReplySchema(Schema):
    id = fields.Int()
    content = fields.Str()
    user_id = fields.Int()
    review_id = fields.Int()
