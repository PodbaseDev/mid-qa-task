import mongoose from "mongoose";
import { Status } from "./types";

const schema = new mongoose.Schema(
    {
        status: {
            type: String,
            enum: Object.values(Status),
            default: Status.Supported,
            required: true
        },
        dealerId: {
            type: String,
            default: null
        },
        manufacturerId: {
            type: String,
            required: true
        },
        model: {
            type: String,
            required: true
        },

    },
    { _id: true, timestamps: true }
);

const model = mongoose.model("cars", schema);

export { model };