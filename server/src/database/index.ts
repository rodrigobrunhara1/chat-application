import mongoose from "mongoose";
import 'dotenv/config';

export default async function connectToMongoDB() {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log("Connected database");
    } catch (error) {
        console.error("Error connecting to moogose!", error);
    }
}
