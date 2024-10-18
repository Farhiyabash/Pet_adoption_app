import os

class Config:
    # Secret key for signing cookies and other cryptographic operations
    SECRET_KEY = os.environ.get('SECRET_KEY', '9ec3aefda2fb71ca09b2c2ce00448b60')
    
    # Database configuration for SQLAlchemy (using SQLite by default)
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'sqlite:///pets.db') 
    SQLALCHEMY_TRACK_MODIFICATIONS = False  # Disable modification tracking for performance

    # JWT configuration
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', '8234447a23636b85520319b5d8b6f025f538f7e3d8fd46384062d394af9aabc9')
    JWT_TOKEN_LOCATION = ['headers']  # Specify where the token can be found (e.g., in headers)
    JWT_ACCESS_TOKEN_EXPIRES = 3600  # Token expiration time in seconds (1 hour)

    # CORS configuration
    CORS_ORIGINS = os.environ.get('CORS_ORIGINS', 'http://localhost:3000')  # Specify allowed origins
