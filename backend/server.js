const express = require('express');
const cors = require('cors');
const connectDB = require('./config/conn');
const heroRoutes = require('./routes/heroRoutes'); // example route

// Load environment variables
// require('dotenv').config();
console.log('Loaded MONGO_URI:', process.env.MONGO_URI);

// Connect to MongoDB
connectDB();

// Initialize app
const app = express();
app.use(cors());

// Middleware to parse JSON
// Increase limit to 5MB
app.use(express.json({ limit: '5mb' }));

// Routes
app.use('/api/heroes', heroRoutes);

// Root route (optional)
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Global error handler (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
