import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connection = {};

const connectToDB = async () => {
  try {
    if (connection.isConnected) {
      //* Caches connection to avoid reconnects
      console.log('connection already exist');
      return true;
    }

    console.log('connecting to DB');
    console.log(process.env.DATABASE_URI);
    const db = await mongoose.connect(process.env.DATABASE_URI);
    console.log('connected to DB');
    connection.isConnected = db.connection;
    return true;
  } catch (error) {
    console.log(' failed to connect DB: ', error);
    throw new Error('DB no connected: ', error);
  }
};

export default connectToDB;
