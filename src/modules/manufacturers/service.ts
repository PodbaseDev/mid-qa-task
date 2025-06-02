import { Manufacturer } from "./types";
import { insertNewRecord, findAll, findRecordById, updateRecord, deleteRecord } from "./repository";
import { DealersService } from "../dealers/facade";

/* ----------- PUBLIC FUNCTIONS ----------- */

const createNew = async (input: Pick<Manufacturer, "make">) => {
    console.log("[modules>manufacturers>service] Creating new manufacturer", input);
    const { make } = input;
    const manufacturer = await insertNewRecord({ make });
    return manufacturer;
};

const getAll = async () => {
    console.log("[modules>manufacturers>service] Getting all manufacturers");
    const manufacturers = await findAll();
    return manufacturers;
};

const updateMake = async (input: Pick<Manufacturer, "_id" | "make">) => {
    console.log("[modules>manufacturers>service] Updating make", input);

    const { _id, make } = input;

    const manufacturer = await getManufacturer(_id);
    if (manufacturer.make === make) {
        throw new Error("The make is already that, silly!!!");
    }

    const updatedManufacturer = await updateRecord({ _id, make });

    return updatedManufacturer;
};

const deleteOne = async (id: string) => {
    console.log("[modules>manufacturers>service] Deleting manufacturer", id);
    const manufacturer = await getManufacturer(id);
    await Promise.allSettled(
        manufacturer.dealerIds.map(async dealerId => {
            await DealersService.removeManufacturerReference(
                {
                    id: dealerId,
                    manufacturerId: id
                }
            );
        })
    );
    await deleteRecord(id);
};

const removeDealer = async ({ manufacturerId, dealerId }: Record<string, string>) => {
    console.log("[modules>manufacturers>service] Removing dealer", { manufacturerId, dealerId});
    
    const manufacturer = await getManufacturer(manufacturerId);
    if (!manufacturer.dealerIds.includes(dealerId)) {
        throw new Error("Dealer does not belong to the manufacturer!");
    }

    const updatedDealerIds = (manufacturer.dealerIds).filter(id => id !== dealerId);
    const updatedManufacturer = await updateRecord({ _id: manufacturerId, dealerIds: updatedDealerIds });

    return updatedManufacturer;
};

const addDealer = async ({ manufacturerId, dealerId }: Record<string, string>) => {
    console.log("[modules>manufacturers>service] Adding dealer", { manufacturerId, dealerId});
    
    const manufacturer = await getManufacturer(manufacturerId);
    if (manufacturer.dealerIds.includes(dealerId)) {
        throw new Error("Dealer already belongs to the manufacturer!");
    }
    
    const updatedDealerIds = (manufacturer.dealerIds).concat(dealerId);
    const updatedManufacturer = await updateRecord({ _id: manufacturerId, dealerIds: updatedDealerIds });

    return updatedManufacturer;
};

const removeSupportedModel = async ({ manufacturerId, supportedModelId }: Record<string, string>) => {
    console.log("[modules>manufacturers>service] Removing supported model", { manufacturerId, supportedModelId});
    
    const manufacturer = await getManufacturer(manufacturerId);
    if (!manufacturer.supportedModelIds.includes(supportedModelId)) {
        throw new Error("Model does not belong to the manufacturer!");
    }

    const updatedSupportedModelIds = (manufacturer.supportedModelIds).filter(id => id !== supportedModelId);
    const updatedManufacturer = await updateRecord({ _id: manufacturerId, supportedModelIds: updatedSupportedModelIds });

    return updatedManufacturer;
};

const addSupportedModel = async ({ manufacturerId, supportedModelId }: Record<string, string>) => {
    console.log("[modules>manufacturers>service] Adding supported model", { manufacturerId, supportedModelId});
    
    const manufacturer = await getManufacturer(manufacturerId);
    if (manufacturer.supportedModelIds.includes(supportedModelId)) {
        throw new Error("Model already belongs to the manufacturer!");
    }
    
    const updatedSupportedModelIds = (manufacturer.supportedModelIds).concat(supportedModelId);
    const updatedManufacturer = await updateRecord({ _id: manufacturerId, supportedModelIds: updatedSupportedModelIds });

    return updatedManufacturer;
};

export { createNew, getAll, updateMake, removeDealer, addDealer, removeSupportedModel, addSupportedModel, deleteOne };

/* ----------- PRIVATE FUNCTIONS ----------- */

const getManufacturer = async (_id: string) => {
    const manufacturer = await findRecordById(_id);
    if (!manufacturer) {
        throw new Error("Manufacturer not found");
    }
    return manufacturer;
};