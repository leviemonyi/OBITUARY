require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", // Leave blank if using XAMPP
    database: "obituary_platform"
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        process.exit(1);
    }
    console.log('Connected to the database.');
});

// Handle form submission
app.post('/submit_obituary', (req, res) => {
    const { name, birth_date, death_date, message } = req.body;

    if (!name || !birth_date || !death_date || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const sql = 'INSERT INTO obituaries (name, birth_date, death_date, message) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, birth_date, death_date, message], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ error: 'Failed to submit obituary' });
        }
        res.status(200).json({ message: 'Obituary submitted successfully', id: result.insertId });
    });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

