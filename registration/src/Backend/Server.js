import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bcrypt from "bcrypt";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "risper",
  database: "practice",
});

// Connection to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.message);
    process.exit(1);
  }
  console.log("Connected to MySQL");

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL
    );
  `;

  connection.query(createTableQuery, (err, results) => {
    if (err) {
      console.error("Error creating the table:", err.message);
    } else {
      console.log("Table 'users' is ready");
    }
  });
});

// Route to handle user registration
app.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  // Validate if all fields are provided
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Hash password before storing it
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error("Error hashing password:", err.message);
      return res.status(500).json({ message: "Error registering user" });
    }

    // Insert user into the database
    const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
    connection.query(query, [username, email, hashedPassword], (err, results) => {
      if (err) {
        console.error("Error inserting user:", err.message);
        return res.status(500).json({ message: "Error registering user" });
      }
      res.status(201).json({ message: "User registered successfully" });
    });
  });
});

// Set up a simple route to test the server
app.get("/", (req, res) => {
  res.send("Hello World! Server is running.");
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

