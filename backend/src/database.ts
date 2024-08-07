import mongoose from "mongoose";

const MONGOOSE_URL = 'mongodb://localhost:27017/crud';

const connectDB = async () => {
    try {
        await mongoose.connect(MONGOOSE_URL);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("Error in mongoose connection:", error);
        process.exit(1);
    }
};

export default connectDB;