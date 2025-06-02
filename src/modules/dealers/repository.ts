import type { Dealer, UpdateDealerInput } from "./types";
import { model } from "./model";

const insertNewRecord = async (input: Pick<Dealer, "name" | "manufacturerId">) => {
    console.log("[modules>dealers>repository] Inserting new record", input);
    const dealer = new model(input);
    await dealer.save();
    return dealer.toJSON();
};

const findAll = async () => {
    console.log("[modules>dealers>repository] Getting all");
    const dealers = await model.find().lean();
    return dealers;
}

const findRecordById = async (_id: string) => {
    console.log("[modules>dealers>repository] Getting record by id", _id);
    const dealer = await model.findOne({ _id }).lean();
    return dealer;
};

const updateRecord = async (input: UpdateDealerInput) => {
    console.log("[modules>dealers>repository] Updating record", input);
    const { _id, name, manufacturerId, carIds } = input;
    const dealer = await model.findOneAndUpdate({ _id }, { name, manufacturerId, carIds }, { new: true }).lean();
    return dealer;
};

const deleteRecord = async (_id: string) => {
    console.log("[modules>dealers>repository] Deleting record", _id);
    await model.deleteOne({ _id });
};

export { insertNewRecord, findAll, findRecordById, updateRecord, deleteRecord };