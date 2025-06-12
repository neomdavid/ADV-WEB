require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const articleRoutes = require('./routes/articleRoutes');
const mongoose = require('mongoose');

const app = express();

// Database Connection
connectDB();

// CORS Configuration
const allowedOrigins = [
  'https://nd-client-liu4dx4mu-neo-davids-projects.vercel.app',
  'http://localhost:5173' // for local development
];

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Welcome message route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to David MERN API',
    status: 'Server is running',
    endpoints: {
      users: '/api/users',
      articles: '/api/articles',
      stats: '/api/users/stats'
    }
  });
});

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/articles', articleRoutes);

// Error Handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Handle 404 routes
app.use((req, res) => {
  console.log('404 Not Found:', req.method, req.url);
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 