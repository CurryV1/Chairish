import csv
import sqlite3

# Connect to your database (this creates a new file if it doesn't exist)
conn = sqlite3.connect('ecommerce.db')
cursor = conn.cursor()

# Drop the table if it exists (to remove old data)
cursor.execute("DROP TABLE IF EXISTS products")

# Create the products table with the updated schema
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

# Open and read the updated CSV file
with open('products.csv', 'r') as file:
    reader = csv.DictReader(file)
    for row in reader:
        cursor.execute('''
            INSERT INTO products (name, description, price, material, color, tags, category, image_ref)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            row['name'].strip(),
            row['description'].strip(),
            float(row['price'].strip()),
            row['material'].strip(),
            row['color'].strip(),
            row['tags'].strip(),
            row['category'].strip(),
            row['image_ref'].strip()
        ))

# Commit changes and close the connection
conn.commit()
conn.close()

print("Database refreshed and CSV data imported successfully.")