// config/db.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      autoIndex: false,    
      serverSelectionTimeoutMS: 5000
    });

    console.log(`MongoDB Connected: ${conn.connection.name}`);

  } catch (error) {
    console.error("Database connection failed");
    console.error(error.message);

    // Exit app safely
    process.exit(1);
  }
};

export default connectDB;