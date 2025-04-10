import sqlite3

# Connect to the database (it will be created if it doesn't exist)
conn = sqlite3.connect('ecommerce.db')
cursor = conn.cursor()

# Create the products table
cursor.execute('''
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    material TEXT,
    color TEXT,
    tags TEXT,
    category TEXT,           
    image_ref TEXT
)
''')

# Commit the changes and close the connection
conn.commit()
conn.close()

print("Database and products table created successfully.")