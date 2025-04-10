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
import session from 'express-session';
import flash from 'express-flash';
import passport from 'passport';
import initializePassport from './passport-config.js';

const app = express();
const port = 3001;


// Enable CORS for all origins
app.use(cors({ origin: "*" }));
app.options("*", cors());
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(flash())
app.use(session({
  secret: "super-secret-stuff",
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

// Enable verbose mode on sqlite3
const sqlite = sqlite3.verbose();
const users = []

initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)
// Connect to your SQLite database
const db = new sqlite.Database("./ecommerce.db", (err) => {
  if (err) {
    console.error("Error opening database", err);
  } else {
    console.log("Connected to SQLite database.");
  }
});

// Updated API endpoint to include color, selected, and material fields
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

  app.post("/update-product", (req, res) => {
    const { id, selected } = req.body; // Expect both 'id' and 'selected' to be in the body
    const query = 'UPDATE products SET selected = ? WHERE id = ?';

    db.run(query, [selected, id], function (err) {
        if (err) {
            return res.status(500).json({ error: "Failed to update product" });
        }
        res.status(200).json({ changes: this.changes });
    });
});

  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});


app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: info.message || 'Login failed' });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ message: 'Login successful' });
    });
  })(req, res, next);
});

app.post('/register', async (req, res) => {
  try {
    console.log('Received registration request:', req.body); // Add this for debugging
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    console.log('Users array after registration:', users);
    res.status(200).json({ message: 'Registration successful!' }); // Send success response
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Registration failed on the server.' }); // Send error response
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
