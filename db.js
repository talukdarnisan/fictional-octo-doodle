// db.js
const mysql = require('mysql2');

// Load environment variables from process.env (dotenv is not needed in production)
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Database not connected:', err.message);
    } else {
        console.log('Database connected successfully');
    }
});

module.exports = connection;
