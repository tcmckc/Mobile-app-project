export default interface Delays {
    ActivityId: string,
    ActivityType: string,
    AdvertisedTimeAtLocation: string,
    EstimatedTimeAtLocation: string,
    AdvertisedTrainIdent: string,
    Canceled: string,
    FromLocation?: {
        LocationName?: string,
        Priority: string,
    }
    ToLocation: string,
};

//interface Delays extends Array<Delays>{}
