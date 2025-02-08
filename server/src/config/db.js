const mongoose = require('mongoose');
const connectDB = async () => {
    const mongoURI = process.env.MONGO_URI;
  
    if (!mongoURI) {
      console.error("MONGO_URI is not defined in the .env file");
      process.exit(1); 
    }
  
    try {
      await mongoose.connect(mongoURI); // No need for useNewUrlParser or useUnifiedTopology
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      process.exit(1); 
    }
  };
  
  
  

module.exports = connectDB;
