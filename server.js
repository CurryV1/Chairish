// import express from "express";
// import cors from "cors";
// import sqlite3 from "sqlite3";

// const app = express();
// const port = 3001;

// // Use CORS middleware for all origins
// app.use(cors({ origin: "*" }));
// app.options("*", cors()); // Enable preflight for all routes

// // Enable verbose mode on sqlite3
// const sqlite = sqlite3.verbose();

// // Connect to your SQLite database
// const db = new sqlite.Database("./ecommerce.db", (err) => {
//   if (err) {
//     console.error("Error opening database", err);
//   } else {
//     console.log("Connected to SQLite database.");
//   }
// });

// // Define your endpoint
// app.get("/api/products", (req, res) => {
//   const category = req.query.category;
//   const search = req.query.search;
//   let sql = "SELECT id, name, description, price, image_ref FROM products";
//   let params = [];

//   if (category && search) {
//     sql +=
//       " WHERE LOWER(category) = LOWER(?) AND (LOWER(name) LIKE ? OR LOWER(description) LIKE ?)";
//     params.push(
//       category.trim(),
//       `%${search.trim().toLowerCase()}%`,
//       `%${search.trim().toLowerCase()}%`
//     );
//   } else if (category) {
//     sql += " WHERE LOWER(category) = LOWER(?)";
//     params.push(category.trim());
//   } else if (search) {
//     sql += " WHERE LOWER(name) LIKE ? OR LOWER(description) LIKE ?";
//     params.push(
//       `%${search.trim().toLowerCase()}%`,
//       `%${search.trim().toLowerCase()}%`
//     );
//   }

//   console.log("SQL:", sql, params);

//   db.all(sql, params, (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     console.log("Rows returned:", rows);
//     res.json(rows);
//   });
// });

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });

// src/server.js (or just server.js in your project root)
import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";

const app = express();
const port = 3001;

// Enable CORS for all origins
app.use(cors({ origin: "*" }));
app.options("*", cors());

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

// Updated API endpoint to include color and material fields
app.get("/api/products", (req, res) => {
  const category = req.query.category;
  const search = req.query.search;
  let sql =
    "SELECT id, name, description, price, image_ref, color, material, selected FROM products";
  let params = [];

  if (category && search) {
    sql +=
      " WHERE LOWER(category) = LOWER(?) AND (LOWER(name) LIKE ? OR LOWER(description) LIKE ?)";
    params.push(
      category.trim(),
      `%${search.trim().toLowerCase()}%`,
      `%${search.trim().toLowerCase()}%`
    );
  } else if (category) {
    sql += " WHERE LOWER(category) = LOWER(?)";
    params.push(category.trim());
  } else if (search) {
    sql += " WHERE LOWER(name) LIKE ? OR LOWER(description) LIKE ?";
    params.push(
      `%${search.trim().toLowerCase()}%`,
      `%${search.trim().toLowerCase()}%`
    );
  }

  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
