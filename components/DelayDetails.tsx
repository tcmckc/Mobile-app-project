import { View, Text } from "react-native";
import { Base, Typography } from '../styles';
import stationModel from '../models/stations.ts';
import { useEffect, useState } from 'react';


export default function DelayDetails({ route }) {
    const { item } = route.params;
    const [stations, setStations] = useState();
    var stationName = null;

    useEffect (() => {
        (async function getStationNames () {
            const allStations = await stationModel.getStations();
            setStations(allStations);
            
        })();
    }, []);

    if (stations !== undefined) {
        stations.map(function (value) {
            if (value.LocationSignature == item.ToLocation[0].LocationName) {
                stationName = value.AdvertisedLocationName;
            }
        });
    }

    return (
        <View style={Base.base}>
            <Text style={Typography.header2}>{item.AdvertisedLocationName}</Text>

            <Text style={Typography.normal}>To: {stationName}</Text>

            <Text style={Typography.normal}>Date: {item.AdvertisedTimeAtLocation.substring(0,10)}</Text>


            <Text style={Typography.normal}>Former departure time: {item.AdvertisedTimeAtLocation.substring(11,16)}</Text>

            <Text style={Typography.header3}>Updated departure time: {item.EstimatedTimeAtLocation.substring(11,16)}</Text>

        </View>

    )
}