import { Manufacturer, UpdateManufacturerInput } from "./types";
import { model } from "./model";

const insertNewRecord = async (input: Pick<Manufacturer, "make">) => {
    console.log("[modules>manufacturers>repository] Inserting new record", input);
    const manufacturer = new model(input);
    await manufacturer.save();
    return manufacturer.toJSON();
};

const findAll = async () => {
    console.log("[modules>manufacturers>repository] Getting all");
    const manufacturers = await model.find().lean();
    return manufacturers;
};

const findRecordById = async (_id: string) => {
    console.log("[modules>manufacturers>repository] Getting record by id", _id);
    const manufacturer = await model.findOne({ _id }).lean();
    return manufacturer;
};

const updateRecord = async (input: UpdateManufacturerInput) => {
    console.log("[modules>manufacturers>repository] Updating record", input);
    const { _id, make, dealerIds, supportedModelIds } = input;
    const manufacturer = await model.findOneAndUpdate({ _id }, { make, dealerIds, supportedModelIds }, { new: true }).lean();
    return manufacturer;
};

const deleteRecord = async (_id: string) => {
    console.log("[modules>manufacturers>repository] Deleting record", _id);
    await model.deleteOne({ _id });
};

export { insertNewRecord, findAll, findRecordById, updateRecord, deleteRecord };