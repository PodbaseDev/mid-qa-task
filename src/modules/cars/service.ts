import type { Car } from "./types";
import { Status } from "./types";
import { insertNewRecord, findAll, findRecordById, updateRecord } from "./repository";
import { ManufacturersService } from "../manufacturers/facade";
import { DealersService } from "../dealers/facade";

/* ----------- PUBLIC FUNCTIONS ----------- */

const createNew = async (input: Pick<Car, "model" | "manufacturerId">) => {
    console.log("[modules>cars>service] Creating new car", input);
    const { model, manufacturerId } = input;
    const car = await insertNewRecord({ model, manufacturerId });
    await ManufacturersService.addCar({ manufacturerId, supportedModelId : String(car._id) });
    return car;
};

const getAll = async () => {
    console.log("[modules>cars>service] Getting all cars");
    const cars = await findAll();
    return cars;
};

const updateOne = async (input: Pick<Car, "_id" | "status" | "dealerId">) => {
    console.log("[modules>cars>service] Updating car", input);

    const { _id, status, dealerId } = input;

    const car = await getCar(_id);

    if (car.status !== status) {
        await updateRecord({ _id, status });
        if (status === Status.Unsupported) {
            await ManufacturersService.removeCar({ manufacturerId: car.manufacturerId, supportedModelId: _id });
        }
    }

    if (car.dealerId != dealerId) {
        await updateRecord({ _id, dealerId });
        if (dealerId) {
            await DealersService.addCarToLot({ dealerId, carId: _id });
        }
        await DealersService.removeCarFromLot({ dealerId: car.dealerId, carId: _id });
    }

    const updatedCar = await getCar(_id);

    return updatedCar;
};

export { createNew, getAll, updateOne };

/* ----------- PRIVATE FUNCTIONS ----------- */

const getCar = async (_id: string) => {
    const car = await findRecordById(_id);
    if (!car) {
        throw new Error("Car not found");
    }
    return car;
};