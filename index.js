const express = require('express');
const app = express();
const port = process.env.PORT || 3007;

// Middleware to parse JSON
app.use(express.json());

// Route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to my API');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
