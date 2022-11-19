import { Text, View, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { Base, Typography } from '../styles';

import MapView from 'react-native-maps';
import { Marker } from "react-native-maps";
import * as Location from 'expo-location';
import delayModel from '../models/delays.ts';
import stationModel from '../models/stations.ts';


export default function ShowMap() {
    const [delays, setDelays] = useState([]);
    const [stations, setStations] = useState([]);

    const [currentLocationMarker, setCurrentLocationMarker] = useState(null);
    const [stationMarker, setStationMarker] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        (async () => {
            setStations(await stationModel.getStations());
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const allDelays = await delayModel.getDelays();

            const allDelaysWithFromLocation = [];
            await allDelays.forEach(function (value) {
                if (value["FromLocation"] !== undefined) {
                    allDelaysWithFromLocation.push(value);
                }
            });
            setDelays(allDelaysWithFromLocation);
        })(); 
    }, []);

    // useEffect(() => {
    //     (async () => {
    //         const delayList = await delays.map(item => ({
    //                 ...stations.find(({ LocationSignature }) =>
    //                 item.FromLocation[0].LocationName == LocationSignature), ...item 
    //             }));
    //         setDelayStations(delayList);
    //     })
    // }, []);


    // const getDelayList = async ()=> {
    //     const delayList = await delays.map(item => ({
    //         ...stations.find(({ LocationSignature }) =>
    //         item.FromLocation[0].LocationName == LocationSignature), ...item 
    //     }));
    //     return delayList;


    if (stations[0] !== undefined && delays[0] !== undefined) {
        var delayList = delays.map(item => ({
            ...stations.find(({ LocationSignature }) =>
            item.FromLocation[0].LocationName == LocationSignature), ...item 
        }));
        // console.log(delayList[0]);
        // console.log(333);
    }

    interface Geometry {
        latitude: Number;
        longitude: Number;
    }

    // setting station marker
    useEffect(() => {
        (async () => {

            const geoData: Geometry = {};
            //const geoData = [];

            if (delayList !== undefined) {

                geoData.longitude = await delayList.map(item => {
                    if (item.Geometry !== undefined) {
                        return item.Geometry.WGS84.replace('(', ' ').replace(')', ' ').split(' ')[2];
                    }
                });

                geoData.latitude =  await delayList.map(item => {
                    if (item.Geometry !== undefined) {
                        return item.Geometry.WGS84.replace('(', ' ').replace(')', ' ').split(' ')[3];
                    }
                });
            }

            
            if (geoData !== []){
                console.log(geoData);
                console.log(444);
                geoData.map(item => {
                    console.log(item.longitude);
                    console.log(555);
                    setStationMarker(<Marker
                        coordinate={{
                            longitude: parseFloat(item.longitude), 
                            latitude: parseFloat(item.latitude)
                        }}
                        title="test!" 
                        pinColor="orange"
                    />);
                });
            }

            // setStationMarker(<Marker
            //     coordinate={{
            //         longitude: parseFloat(geoData.longitude), 
            //         latitude: parseFloat(geoData.latitude)
            //     }}
            //     title={delayList.AdvertisedLocationName} 
            //     pinColor="orange"
            // />);
        })();
    }, []);

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
            <Text style={Typography.header2}>Delayed trains</Text>
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 56.1612,
                        longitude: 15.5869,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }}>
                    {currentLocationMarker}
                    {stationMarker}

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
