require('dotenv').config();
const express = require('express');
const cors = require('cors');
const photoRoutes = require('./routes/photos');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());
app.use('/api/photos', photoRoutes);
app.use('/photos', express.static('db/photos'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
