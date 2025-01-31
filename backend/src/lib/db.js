import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

export async function connectDB() {
    try {
      const connection = await mongoose.connect(process.env.MONGODB_URL);
      console.log(`DB successfully connected to : ${connection.connection.host}`);
        
    } catch (error) {
        console.log("Error connecting to DB: ",error);
        process.exit(1) // 1 for failure and 0 for success
    }
}