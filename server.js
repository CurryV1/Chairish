import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";

const app = express();
const port = 3001;

// Use CORS middleware for all origins
app.use(cors({ origin: "*" }));
app.options("*", cors()); // Enable preflight for all routes

// Enable verbose mode on sqlite3
const sqlite = sqlite3.verbose();

// Connect to your SQLite database
const db = new sqlite.Database("./ecommerce.db", (err) => {
  if (err) {
    console.error("Error opening database", err);
  } else {
    console.log("Connected to SQLite database.");
  }
});

// Define your endpoint
app.get("/api/products", (req, res) => {
  const category = req.query.category;
  console.log("Querying category:", category);
  const sql = `SELECT id, name, description, price, image_ref FROM products WHERE LOWER(category) = LOWER(?)`;
  db.all(sql, [category.trim()], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.log("Rows returned:", rows);
    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
