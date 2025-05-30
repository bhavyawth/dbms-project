const express = require('express');
const path = require('path');
const { connectToMongoDb } = require('./config/connection');

connectToMongoDb('mongodb://127.0.0.1:27017/rentngo')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

const app = express();
const PORT = 3000;


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});