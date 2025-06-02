import * as Service from "./service";

export const ManufacturersService = {
    addDealer: Service.addDealer,
    removeDealer: Service.removeDealer,
    addCar: Service.addSupportedModel,
    removeCar: Service.removeSupportedModel
};