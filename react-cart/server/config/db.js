const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connectionStringParts = process.env.MONGODB_URI.split('@');
    const sanitizedConnectionString = connectionStringParts.length > 1 
      ? `mongodb+srv://<credentials>@${connectionStringParts[1]}`
      : 'Invalid connection string';
    console.log('Attempting to connect to:', sanitizedConnectionString);

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    mongoose.connection.on('error', err => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected. Attempting to reconnect...');
    });

  } catch (error) {
    console.error('MongoDB Connection Error Details:', {
      message: error.message,
      code: error.code,
      name: error.name
    });
    
    if (error.name === 'MongoParseError') {
      console.error('Invalid connection string format. Please check your MONGODB_URI.');
      process.exit(1);
    }
    
    console.log('Retrying connection in 5 seconds...');
    setTimeout(connectDB, 5000);
  }
};

module.exports = connectDB; 