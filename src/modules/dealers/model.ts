import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        manufacturerId: {
            type: String,
            required: true
        },
        carIds: {
            type: [String],
            default: [],
            required: true
        }

    },
    { _id: true, timestamps: true }
);

const model = mongoose.model("dealers", schema);

export { model };