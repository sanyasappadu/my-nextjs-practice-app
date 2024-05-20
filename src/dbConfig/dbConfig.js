// src/dbConfig/dbConfig.js
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const options = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, options).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export { connect };




// import mongoose from "mongoose";

// export async function connect () {
//   try {
//     mongoose.connect(process.env.MONGO);
//     const connection = mongoose.connection;

//     connection.on('connected', ()=>{
//       console.log('mongoose connected successfully!');
//     })
//     connection.on('error', (err)=>{
//       console.log('mongoose connection error, please connect again', err);
//       process.exit();
//     })
//   } catch (error) {
//     console.log('something went wrong!');
//     console.log(error);
//   }
// }