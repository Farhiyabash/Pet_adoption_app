import sqlite3

# Connect to your database
conn = sqlite3.connect('/home/mark/Development/Pet_adoption_app/backend/instance/pets.db')  # Full path to the DB
cursor = conn.cursor()

# SQL to create the reviews table
create_table_query = '''
CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pet_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    rating INTEGER CHECK(rating >= 1 AND rating <= 5),
    comment TEXT,
    FOREIGN KEY (pet_id) REFERENCES pets(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
'''

# Execute and commit
cursor.execute(create_table_query)
conn.commit()
conn.close()
