import mongoose from 'mongoose';

const connection = {};

const connectToDB = async () => {
  try {
    if (connection.isConnected) {
      console.log('connection already exist');
      return;
    }

    console.log('connecting to DB');
    const db = await mongoose.connect(process.env.DATABASE_URL);
    console.log('connected to DB');
    connection.isConnected = db.connection;
  } catch (error) {
    console.log(' failed to connect DB: ', error);
  }
};

export default connectToDB;
