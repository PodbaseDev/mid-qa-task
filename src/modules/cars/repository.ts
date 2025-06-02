import type { Car, UpdateCarInput } from "./types";
import { model } from "./model";

const insertNewRecord = async (input: Pick<Car, "model" | "manufacturerId">) => {
    console.log("[modules>cars>repository] Inserting new record", input);
    const car = new model(input);
    await car.save();
    return car.toJSON();
};

const findAll = async () => {
    console.log("[modules>cars>repository] Getting all");
    const cars = await model.find().lean();
    return cars;
};

const findRecordById = async (_id: string) => {
    console.log("[modules>cars>repository] Getting record by id", _id);
    const car = await model.findOne({ _id }).lean();
    return car;
};

const updateRecord = async (input: UpdateCarInput) => {
    console.log("[modules>cars>repository] Updating record", input);
    const { _id, status, dealerId } = input;
    const car = await model.findOneAndUpdate({ _id }, { status, dealerId }, { new: true }).lean();
    return car;
};

export { insertNewRecord, findAll, findRecordById, updateRecord };