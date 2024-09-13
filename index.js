const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const port = 3009; // Change port here to match Docker Compose settings

// MySQL connection setup
const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

// Connect to the MySQL database
db.connect(err => {
  if (err) {
    console.error('Database not connected:', err);
  } else {
    console.log('Database connected');
  }
});

// Simple route to check connection
app.get('/', (req, res) => {
  res.send('Hello! Node.js app is connected to MySQL.');
});

// Start the server
app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
