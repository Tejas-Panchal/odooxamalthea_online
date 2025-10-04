// Import required packages
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Route files
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const expenseRoutes = require('./routes/expenses');
const workflowRoutes = require('./routes/workflows');
const utilRoutes = require('./routes/utils');

// Initialize dotenv to use environment variables
dotenv.config();

connectDB();

// Create an Express application
const app = express();

// Use middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Enable the express app to parse JSON formatted request bodies

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/workflows', workflowRoutes);
app.use('/api/utils', utilRoutes);

// Define a simple route for testing
app.get('/', (req, res) => {
  res.send('Expense Management API is running...');
});

// Define the port the server will run on
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});