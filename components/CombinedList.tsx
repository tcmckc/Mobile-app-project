import { useState, useEffect } from "react";
import delayModel from '../models/delays.ts';
import stationModel from '../models/stations.ts';

export default function CombinedList() {
    const [combinedList, setCombinedList] = useState([]);

    function getStationList () {
        return stationModel.getStations();
    };

    async function getDelayList () {
        const allDelays = await delayModel.getDelays();
        const allDelaysWithFromLocation = [];
        await allDelays.forEach(function (value) {
            if (value["FromLocation"] !== undefined) {
                allDelaysWithFromLocation.push(value);
            }
        });
        return allDelaysWithFromLocation;

    };

    useEffect(() => {
        (async () => {
            const stations = await getStationList();
            const delays = await getDelayList();

            var delayStationList = await delays.map(item => ({
                ...stations.find(({ LocationSignature }) =>
                item.FromLocation[0].LocationName == LocationSignature), ...item 
            }));

            setCombinedList(delayStationList);

        })();
    }, []);
};
