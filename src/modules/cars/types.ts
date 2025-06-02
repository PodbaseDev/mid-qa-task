enum Status {
    Supported = "SUPPORTED",
    Unsupported = "UNSUPPORTED"
};

type Car = {
    _id: string;
    status: Status;
    dealerId: string | null;
    manufacturerId: string;
    model: string;
};

type UpdateCarInput = { _id: string } & Partial<Omit<Car, "_id" | "manufacturerId" | "model">>;

export { Status, Car, UpdateCarInput };