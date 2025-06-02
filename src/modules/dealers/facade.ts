import * as Service from "./service";

export const DealersService = {
    removeManufacturerReference: Service.removeManufacturer,
    removeCarFromLot: Service.removeCar,
    addCarToLot: Service.addCar
};