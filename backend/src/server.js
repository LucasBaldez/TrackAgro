const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const path = require('path');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/animals', require('./routes/animalRoutes'));
app.use('/api/vaccines', require('./routes/vaccineRoutes'));
app.use('/api/diseases', require('./routes/diseaseRoutes'));
app.use('/api/reproduction', require('./routes/reproductionRoutes'));
app.use('/api/movements', require('./routes/movementRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));

// Static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
