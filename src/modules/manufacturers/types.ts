type Manufacturer = {
    _id: string,
    make: string,
    dealerIds: string[],
    supportedModelIds: string[],
};

type UpdateManufacturerInput = { _id: string } & Partial<Omit<Manufacturer, "_id">>;

export { Manufacturer, UpdateManufacturerInput };