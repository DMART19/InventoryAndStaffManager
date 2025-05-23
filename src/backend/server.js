const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// PostgreSQL connection setup
const pool = new Pool({
  user: process.env.DB_USER || 'dbadmin',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'inventorydatabase',
  password: process.env.DB_PASSWORD || 'St00pidSt@ng',
  port: process.env.DB_PORT || 5432,
});

// Test database connection
pool.connect()
  .then(() => console.log('✅ Connected to PostgreSQL database'))
  .catch((err) => {
    console.error('❌ Database connection error:', err);
    process.exit(1); // Exit process if DB connection fails
  });

// Import routes and pass database pool
const staffRoutes = require('./routes/staffRoutes');
const taskRoutes = require('./routes/taskRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');

// Check if route files are correctly exporting functions that take the pool as an argument
console.log('Staff routes:', staffRoutes);
console.log('Task routes:', taskRoutes);
console.log('Inventory routes:', inventoryRoutes);

// Use routes and pass pool into each one to avoid the "undefined" issue
app.use('/staff', staffRoutes(pool));  // Passing pool to the route handler
app.use('/tasks', taskRoutes(pool));   // Passing pool to the route handler
app.use('/inventory', inventoryRoutes(pool)); // Passing pool to the route handler

// Handle undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = pool;
