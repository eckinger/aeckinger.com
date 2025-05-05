const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/test', (req, res) => {
    res.json({ message: 'API is working!' });
});

router.get('/', async (req, res) => {
  try {
    console.log("attemping db connection");
    const [rows] = await db.query('SELECT * FROM photos ORDER BY photo_date DESC');
    console.log("db connection successful");
    res.json(rows);
  } catch (error) {
    console.error('Error fetching photos:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
