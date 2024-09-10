const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false // Adjust this based on your SSL configuration
  }
});

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
