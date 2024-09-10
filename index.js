const express = require('express');
const redis = require('redis');
const axios = require('axios');
const app = express();
const port = 3008;

// Redis connection details
const redisUrl = 'redis://:zjI9KW1VKmXV9QoPTWEVRKjy9pbwORgBUvaKVDL4G61bvcz3Js3FHvv9dZxNSDFX@83.171.249.37:5434/0';
const redisClient = redis.createClient({ url: redisUrl });

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

// Middleware to check Redis connection
app.use(async (req, res, next) => {
  try {
    await redisClient.ping(); // Check Redis connection
    req.redisConnected = true;
  } catch (error) {
    req.redisConnected = false;
    console.error('Redis connection failed:', error);
  }
  next();
});

// Root route
app.get('/', (req, res) => {
  if (req.redisConnected) {
    res.send('Redis connection is successful');
  } else {
    res.send('Redis connection is not successful');
  }
});

// Route to fetch data from JSONPlaceholder
app.get('/data', async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const data = response.data;

    // Cache data in Redis
    if (req.redisConnected) {
      await redisClient.set('jsonPlaceholderData', JSON.stringify(data));
    }

    res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});

// Route to fetch data from Redis
app.get('/cached-data', async (req, res) => {
  try {
    if (req.redisConnected) {
      const cachedData = await redisClient.get('jsonPlaceholderData');
      if (cachedData) {
        res.json(JSON.parse(cachedData));
      } else {
        res.status(404).send('No da
