const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');
const User = require('../models/User');

dotenv.config();

const products = [
  {
    name: "MacBook Pro",
    price: 1299.99,
    image: "https://source.unsplash.com/featured/?macbook",
    category: "laptop",
    description: "Powerful laptop for professionals",
    stock: 10
  },
  {
    name: "iPhone 13",
    price: 999.99,
    image: "https://source.unsplash.com/featured/?iphone",
    category: "phone",
    description: "Latest iPhone with amazing features",
    stock: 15
  },
  {
    name: "Gaming PC",
    price: 1999.99,
    image: "https://source.unsplash.com/featured/?gaming,pc",
    category: "computer",
    description: "High-performance gaming computer",
    stock: 5
  },
  {
    name: "Dell XPS 13",
    price: 1099.99,
    image: "https://source.unsplash.com/featured/?dell,laptop",
    category: "laptop",
    description: "Ultra-portable premium laptop",
    stock: 8
  },
  {
    name: "Samsung Galaxy S21",
    price: 899.99,
    image: "https://source.unsplash.com/featured/?samsung,phone",
    category: "phone",
    description: "Feature-rich Android smartphone",
    stock: 12
  }
];

const seedAdmin = {
  name: "Admin User",
  email: "admin@example.com",
  password: "admin123",
  role: "admin"
};

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');

    // Seed products
    await Product.insertMany(products);
    console.log('Products seeded');

    // Create admin user
    const admin = new User(seedAdmin);
    await admin.save();
    console.log('Admin user created');

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 