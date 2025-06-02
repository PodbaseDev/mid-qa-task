import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        make: {
            type: String,
            unique: true,
            required: true
        },
        dealerIds: {
            type: [String],
            default: [],
            required: true
        },
        supportedModelIds: {
            type: [String],
            default: [],
            required: true
        }
    },
    { _id: true, timestamps: true }
);

const model = mongoose.model("manufacturers", schema);

export { model };