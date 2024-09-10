const express = require('express');
const { getConnection } = require('./db');
const app = express();
const port = process.env.PORT || 3007;

app.use(express.json());

// Example route to test database connection
app.get('/test-db', (req, res) => {
  getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ error: 'Database connection failed', details: err.message });
    }
    connection.query('SELECT NOW() AS now', (error, results) => {
      connection.release(); // Release the connection back to the pool
      if (error) {
        return res.status(500).json({ error: 'Query failed', details: error.message });
      }
      res.json({ currentTime: results[0].now });
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
