// server.js in your project root
import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import flash from "express-flash";
import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";  // Uncomment if you start using bcrypt

// Import path utilities for absolute paths (ESM)
import path from "path";
import { fileURLToPath } from "url";

// Establish __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Add these near your other imports
const JWT_SECRET = "your-secret-key-here";

const app = express();
const port = 3001;

// Debug incoming requests - add this before any middleware
app.use((req, res, next) => {
  console.log("--------------------------------");
  console.log(`${req.method} ${req.url}`);
  console.log("Headers:", req.headers);
  next();
});

// Enable CORS for all origins with more detailed options
app.use(
  cors({
    origin: true, // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    credentials: true,
  })
);

// Handle preflight requests
app.options("*", cors());

// Body parser middleware - make sure these come BEFORE routes
app.use(express.json({ limit: "10mb" })); // Important for parsing JSON

// Debug body parser
app.use((req, res, next) => {
  console.log("Raw body:", req.body);
  if (req.method === "POST") {
    console.log("Content-Type:", req.headers["content-type"]);
    console.log("POST Body (parsed):", req.body);
    if (!req.body || Object.keys(req.body).length === 0) {
      console.log("⚠️ WARNING: Empty body detected in POST request!");
    }
  }
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(flash());

// Enable verbose mode on sqlite3
const sqlite = sqlite3.verbose();
const users = [];

// Connect to your SQLite database (since server.js is in the root)
const dbPath = path.join(__dirname, "ecommerce.db");
const db = new sqlite.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database", err);
  } else {
    console.log("Connected to SQLite database at:", dbPath);
  }
});

// ------------------------ API Endpoints ------------------------

// Register endpoint
app.post("/register", async (req, res) => {
  console.log("🔎 REGISTER endpoint hit");
  console.log("Request body available:", req.body);
  console.log("Content-Type:", req.headers["content-type"]);

  try {
    console.log("Raw body type:", typeof req.body);
    console.log("Raw body stringified:", JSON.stringify(req.body));

    const { name, email, password } = req.body;

    console.log("Extracted fields:", {
      name: name || "MISSING",
      email: email || "MISSING",
      password: password ? "PROVIDED" : "MISSING",
    });

    if (
      !req.body ||
      (typeof req.body === "object" && Object.keys(req.body).length === 0)
    ) {
      console.error("💥 Empty request body received!");
      return res.status(400).json({ message: "Empty request body received" });
    }

    if (!name || !email || !password) {
      console.error("❌ Field validation failed:", {
        nameProvided: !!name,
        emailProvided: !!email,
        passwordProvided: !!password,
      });
      return res.status(400).json({ message: "All fields are required" });
    }

    if (users.some((u) => u.email === email)) {
      console.log("User already exists:", email);
      return res.status(400).json({ message: "Email already registered" });
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password, // In a real app, store hashedPassword instead
    };

    users.push(newUser);
    console.log("✅ User registered successfully:", {
      id: newUser.id,
      name,
      email,
    });

    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      success: true,
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("💥 Registration error:", error);
    res.status(500).json({ message: "Registration failed: " + error.message });
  }
});

// Updated API endpoint for products
app.get("/api/products", (req, res) => {
  const category = req.query.category;
  const search = req.query.search;
  let sql =
    "SELECT id, name, description, price, image_ref, color, material FROM products";
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

app.post("/update-product", (req, res) => {
  const { id, selected } = req.body; // Expect both 'id' and 'selected' to be in the body
  const query = "UPDATE products SET selected = ? WHERE id = ?";

  db.run(query, [selected, id], function (err) {
    if (err) {
      return res.status(500).json({ error: "Failed to update product" });
    }
    res.status(200).json({ changes: this.changes });
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = users.find((u) => u.email === email);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Simple plain-text password check; replace with bcrypt in a real app.
    const isMatch = password === user.password;

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({
      success: true,
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/auth/status", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.json({ authenticated: false });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = users.find((u) => u.id === decoded.userId);

    if (!user) {
      return res.json({ authenticated: false });
    }

    res.json({
      authenticated: true,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.json({ authenticated: false });
  }
});

// -------------------- Serve Static Files for SPA --------------------

// Serve static files from the built front-end (assuming build output is in "dist" in the project root)
app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
