// db.js
const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'g8ooskkwossok488s4scg00s',
    user: 'mysql',
    password: 'i1p662CepxK2LNwWUp5GPvvsl6B9cAU0zsrdGbx9sOwdjz4hh3jjlvqoeRqe7kiw',
    database: 'default',
    port: 4532
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Database not connected:', err.message);
    } else {
        console.log('Database connected successfully');
    }
});

// Export the connection
module.exports = connection;
