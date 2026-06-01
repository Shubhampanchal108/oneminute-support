import mongoose from "mongoose"

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      console.log("MongoDB Already Connected ✅")
      return
    }
    
    await mongoose.connect(process.env.DATABASE_URL!)
    console.log("MongoDB Connected 🚀")
  } catch (error) {
    console.error("Connection Failed ❌", error)
  }
}
