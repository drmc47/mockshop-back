import mongoose, { ConnectOptions } from "mongoose";

const databaseURL = process.env.DATABASE_URL;
const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(databaseURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        process.exit(1); // Exit the process with a failure code
    }
};

export default connectDB;
