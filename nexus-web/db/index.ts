/** @format */
import mongoose from "mongoose";
type ConnectType = {
  isConnected?: number;
};

const connect: ConnectType = {};

async function dbConnect() {
  if (connect.isConnected) {
    console.log("dataBase is already connected");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});
    connect.isConnected = db.connections[0]?.readyState;
    console.log("Database connected");
  } catch (error) {
    console.log("Error connecting to database. error is:-", error);
    process.exit(1);
  }
}
export default dbConnect;
