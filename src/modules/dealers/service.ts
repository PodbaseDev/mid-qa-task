import type { Dealer } from "./types";
import { insertNewRecord, findAll, findRecordById, updateRecord, deleteRecord } from "./repository";
import { ManufacturersService } from "../manufacturers/facade";

/* ----------- PUBLIC FUNCTIONS ----------- */

const createNew = async (input: Pick<Dealer, "name" | "manufacturerId">) => {
    console.log("[modules>dealers>service] Creating new dealer", input);
    const { name, manufacturerId } = input;
    const dealer = await insertNewRecord({ name, manufacturerId });
    await ManufacturersService.addDealer({ manufacturerId, dealerId: String(dealer._id) });
    return dealer;
};

const getAll = async () => {
    console.log("[modules>dealers>service] Getting all dealers");
    const dealers = await findAll();
    return dealers;
};

const updateName = async (input: Pick<Dealer, "_id" | "name">) => {
    console.log("[modules>dealers>service] Updating name", input);

    const { _id, name } = input;

    const dealer = await getDealer(_id);
    if (dealer.name === name) {
        throw new Error("The name is already that, silly!!!");
    }

    const updatedDealer = await updateRecord({ _id, name });

    return updatedDealer;
};

const deleteOne = async (id: string) => {
    console.log("[modules>manufacturers>service] Deleting manufacturer", id);
    const dealer = await getDealer(id);
    await ManufacturersService.removeDealer({ manufacturerId: dealer.manufacturerId, dealerId: id });
    await deleteRecord(id);
};

const removeManufacturer = async ({ id, manufacturerId }: Record<string, string>) => {
    console.log("[modules>dealers>service] Removing manufacturer", { id, manufacturerId });
    const dealer = await getDealer(id);
    if (dealer.manufacturerId !== manufacturerId) {
        throw new Error("Manufacturer does not belong to the dealer!");
    }
    await updateRecord({ _id: id, manufacturerId: undefined });
};

const removeCar = async ({ dealerId, carId }: Record<string, string>) => {
    console.log("[modules>dealers>service] Removing car", { dealerId, carId});
    
    const dealer = await getDealer(dealerId);
    if (!dealer.carIds.includes(carId)) {
        throw new Error("Car does not belong to the dealer!");
    }

    const updatedCarIds = (dealer.carIds).filter(id => id !== carId);
    const updatedDealer = await updateRecord({ _id: dealerId, carIds: updatedCarIds });

    return updatedDealer;
};

const addCar = async ({ dealerId, carId }: Record<string, string>) => {
    console.log("[modules>dealers>service] Adding car", { dealerId, carId});
    
    const dealer = await getDealer(dealerId);
    if (dealer.carIds.includes(carId)) {
        throw new Error("Car already belongs to the dealer!");
    }
    
    const updatedCarIds = (dealer.carIds).concat(carId);
    const updatedDealer = await updateRecord({ _id: dealerId, carIds: updatedCarIds });

    return updatedDealer;
};

export { createNew, getAll, updateName, deleteOne, removeManufacturer, removeCar, addCar };

/* ----------- PRIVATE FUNCTIONS ----------- */

const getDealer = async (_id: string) => {
    const dealer = await findRecordById(_id);
    if (!dealer) {
        throw new Error("Dealer not found");
    }
    return dealer;
};