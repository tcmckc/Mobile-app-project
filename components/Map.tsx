import { Text, View, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { Base, Typography } from '../styles';

import MapView from 'react-native-maps';
import { Marker } from "react-native-maps";
import * as Location from 'expo-location';
import delayModel from '../models/delays.ts';
import stationModel from '../models/stations.ts';


export default function ShowMap() {
    const [currentLocationMarker, setCurrentLocationMarker] = useState(null);
    //const [delayList, setDelayList] = useState([]);
    const [stationMarker, setStationMarker] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [myList, setMyList] = useState([]);

    async function getDelaysWithName () {
        const allDelays = await delayModel.getDelays();

        const allDelaysWithFromLocation = [];
        allDelays.forEach(function (value) {
                if (value["FromLocation"] !== undefined) {
                    allDelaysWithFromLocation.push(value);
                }
        });
        return allDelaysWithFromLocation;
    };

    useEffect(() => {
        (async () => {
            const delays = await getDelaysWithName();

            const stations = await stationModel.getStations();

            const newMyList = await delays?.map(item => ({
                ...stations.find(({ LocationSignature }) =>
                item.FromLocation[0].LocationName == LocationSignature), ...item
            }));

            setMyList(newMyList);
        })()
    }, []);

    // function getStationList () {
    //     return stationModel.getStations();
    // };

    // async function getDelayList () {
    //     const allDelays = await delayModel.getDelays();
    //     const allDelaysWithFromLocation = [];
    //     await allDelays.forEach(function (value) {
    //         if (value["FromLocation"] !== undefined) {
    //             allDelaysWithFromLocation.push(value);
    //         }
    //     });
    //     return allDelaysWithFromLocation;

    // };

    // async function getDelayStationList() {
    //     const stations = await getStationList();
    //     const delays = await getDelayList();

    //     var delayStationList = await delays.map(item => ({
    //         ...stations.find(({ LocationSignature }) =>
    //         item.FromLocation[0].LocationName == LocationSignature), ...item 
    //     }));

    //     return delayStationList;
    // };

    // useEffect(() => {
    //     (async () => {
    //         let newList = await getDelayStationList();
    //         setDelayList(newList);
    //     })();
    // }, []);

    // async function getDelaysWithName () {
    //     const allDelays = await delayModel.getDelays();

    //     const allDelaysWithFromLocation = [];
    //     allDelays.forEach(function (value) {
    //             if (value["FromLocation"] !== undefined) {
    //                 allDelaysWithFromLocation.push(value);
    //             }
    //     });
    //     return allDelaysWithFromLocation;
    // };

    // useEffect(() => {
    //     (async () => {
    //         const delays = await getDelaysWithName();

    //         const stations = await stationModel.getStations();

    //         const newMyList = await delays?.map(item => ({
    //             ...stations.find(({ LocationSignature }) =>
    //             item.FromLocation[0].LocationName == LocationSignature), ...item
    //         }));

    //         setMyList(newMyList);
    //     })()
    // }, []);

    // FIXME:
    // setting station marker
    console.log(myList[0]);
    console.log(333);

    
    useEffect(() => {
        (async () => {
            if (myList[0] !== undefined){
                await myList.map((item, index) => {
                    setStationMarker([...stationMarker,
                        (<Marker
                        coordinate={{
                            longitude: parseFloat(item.Geometry.WGS84.replace('(', ' ').replace(')', ' ').split(' ')[2]), 
                            latitude: parseFloat(item.Geometry.WGS84.replace('(', ' ').replace(')', ' ').split(' ')[3]),
                        }}
                        title={item.AdvertisedLocationName}
                        description={item.EstimatedTimeAtLocation.substring(11,16)}
                        pinColor="orange"
                        key={index}
                    />)]);
                })
            }
        })();
    }, [myList]);


    console.log(stationMarker);
    console.log(44);

    // setting user's current location marker
    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                setErrorMessage('Permission to access location was denied');
                return;
            }
            const currentLocation = await Location.getCurrentPositionAsync({});

            setCurrentLocationMarker(<Marker
                coordinate={{
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude
                }}
                title="Current position"
                pinColor="blue"
            />);
        })();
    }, []);

    return (
        <View style={Base.base}>
            <Text style={Typography.header2}>Stations with Delayed Trains</Text>
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 56.1612,
                        longitude: 15.5869,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }}>
                    {stationMarker}
                    {currentLocationMarker}
                </MapView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
