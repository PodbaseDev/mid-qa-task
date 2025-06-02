type Dealer = {
    _id: string;
    name: string;
    manufacturerId: string;
    carIds: string[];
};

type UpdateDealerInput = { _id: string } & Partial<Omit<Dealer, "_id">>;

export type { Dealer, UpdateDealerInput };