require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection with improved error handling
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000
    });
    console.log('MongoDB connected successfully');
    
    // Create initial admin if doesn't exist
    await createInitialAdmin(); 
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

// Initial admin setup
async function createInitialAdmin() {
  const Admin = require('./models/Customer');
  const adminExists = await Admin.findOne({ email: 'admin@example.com' });
  
  if (!adminExists) {
    await Admin.create({
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin123',
      isAdmin: true
    });
    console.log('Default admin account created');
  }
}

// Routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/customers', require('./routes/customerRoutes'));
app.use('/api/carousel', require('./routes/carouselRoutes'));

// Start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Admin interface: http://localhost:${PORT}/admin/login.html`);
    console.log('Use admin@example.com / admin123 to login');
  });
});