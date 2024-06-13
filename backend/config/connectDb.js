import mongoose from "mongoose"

const connectDb =async (DB_URL) => {
    const DB_OPTIONS = {
        dbName : "todoApp"
    }
    await mongoose.connect(DB_URL, DB_OPTIONS) ;
    console.log( "MongoDB connected successfully");
}

export default connectDb