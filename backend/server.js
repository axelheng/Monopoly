const express = require('express');
const cors = require('cors');
const { Pool } = require('pg'); 
const bcrypt = require('bcrypt');
require('dotenv').config();    // Load variables from .env file

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

// Initialize Database Pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Test Database Connection Route
app.get('/api/db-test', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        return res.json({ 
            status: "Backend is connected to PostgreSQL!", 
            time: result.rows[0].now 
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Database connection failed." });
    }
});

app.get('/api/health', (req, res) => {
    return res.json({ status: "Backend is running smoothly!" });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});

app.post('/api/auth/register', async (req, res) => {
    const { email, password } = req.body;

    // Basic input validation
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
    }

    try {
        //Check if the user already exists in the database
        const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userCheck.rows.length > 0) {
            return res.status(400).json({ error: "An account with this email already exists." });
        }

        // Hash the password safely (10 salt rounds is standard)
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        const newUser = await pool.query(
            'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email, created_at',
            [email, hashedPassword]
        );

        return res.status(201).json({
            message: "User registered successfully!",
            user: newUser.rows[0]
        });

    } catch (err) {
        console.error("Registration error:", err);
        return res.status(500).json({ error: "Server error during registration." });
    }
});

// Login Endpoint
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;

    // Basic input validation
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
    }

    try {
        // Look up the user by email
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        
        // If user doesn't exist
        if (result.rows.length === 0) {
            return res.status(401).json({ error: "Invalid credentials." });
        }

        const user = result.rows[0];

        // Compare the incoming password with the stored hash
        const isMatch = await bcrypt.compare(password, user.password_hash);
        
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials." });
        }

        // Success! For Milestone 1, returning user info confirms they are authenticated.
        return res.json({
            message: "Login successful!",
            user: {
                id: user.id,
                email: user.email
            }
        });

    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ error: "Server error during login." });
    }
});
