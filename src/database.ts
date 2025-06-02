import mongoose from "mongoose";

const connectDatabase = () => {
    mongoose.connect(process.env.MONGODB_URI as string);
    mongoose.connection.on("error", (err) => {
        console.log("Mongoose connection error caught", err);
    });
    mongoose.connection.on("disconnected", () => {
        console.log("Mongoose disconnected");
    });
    console.log("Mongoose configured!");
};

export { connectDatabase };