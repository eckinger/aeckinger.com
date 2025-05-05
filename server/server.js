const express = require('express');
const cors = require('cors');
const photoRoutes = require('./routes/photos');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/photos', photoRoutes);
app.use('/photos', express.static('db/photos'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
