import mongoose from "mongoose"
import { MONGODB_URI } from "./default"

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI)
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.log("Connection refused")
    process.exit(1)
  }
}

export default connectDb
