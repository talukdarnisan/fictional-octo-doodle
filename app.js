const express = require('express');
const { getConnection } = require('./db');

const app = express();
const port = process.env.PORT || 3007;

app.get('/', (req, res) => {
  getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ error: 'Database connection failed' });
    }

    // Example query
    connection.query('SELECT 1 + 1 AS solution', (error, results) => {
      connection.release();
      if (error) {
        return res.status(500).json({ error: 'Query failed' });
      }
      res.send('The solution is: ' + results[0].solution);
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
