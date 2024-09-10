const mysql = require('mysql');

// Create a MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,  // Default MySQL port
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false // Adjust if SSL is required
  }
});

// Function to get a database connection
const getConnection = (callback) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to MySQL database:', err.code, err.message);
      return callback(err, null);
    }
    callback(null, connection);
  });
};

module.exports = { getConnection };
