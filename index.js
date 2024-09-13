// index.js
const express = require('express');
const db = require('./db');  // Import the db connection

const app = express();
const port = 3009;

// Test route to check if the server and database are running
app.get('/', (req, res) => {
    if (db.state === 'authenticated') {
        res.send('Database connected successfully');
    } else {
        res.send('Database not connected');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
