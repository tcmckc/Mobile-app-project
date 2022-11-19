import { Text, View, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { Base, Typography } from '../styles';

import MapView from 'react-native-maps';
import { Marker } from "react-native-maps";
import * as Location from 'expo-location';
import delayModel from '../models/delays.ts';
import stationModel from '../models/stations.ts';



//TODO: どうやってdelay情報をここに持ってくるか
// route??
// モデルから新規取得？
export default function ShowMap( route ) {
    const [delays, setDelays] = useState([]);
    const [stations, setStations] = useState([]);
    const [marker, setMarker] = useState(null);
    const [locationMarker, setLocationMarker] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        (async () => {
            const allDelays = await delayModel.getDelays();
            setDelays(allDelays);
        })(); 
    }, []);

    useEffect(() => {
        (async () => {
            const allStations = await stationModel.getStations();
            setStations(allStations);
        })();
    }, []);

    const foo = [];
    delays.forEach(function (value) {
        if (value["FromLocation"] !== undefined) {
            foo.push(value);
        }
    });

    const sig = [];
    stations.forEach(function (value) {
        sig.push(value["LocationSignature"]);
    })

    foo.map((item) => {
        for (let i = 0; i < sig.length; i++) {
            if (item.FromLocation[0].LocationName == [i]) {
                console.log(stations.AdvertisedLocationName);
            }
        }
    });

    // delayListはstationとdelay合わさったリスト
    const delayList = foo.map(item => ({
        ...stations.find(({ LocationSignature }) =>
        item.FromLocation[0].LocationName == LocationSignature), ...item 
    }));

    console.log(delayList[0]);
    console.log('&&&&&&&');

    interface Geometry {
        latitude: Number;
        longitude: Number;
    }
    const geoData: Geometry = {};

    geoData.longitude = delayList.map(item => {
         return item.Geometry.WGS84.replace('(', ' ').replace(')', ' ').split(' ')[2];
    });

    geoData.latitude = delayList.map(item => {
        return item.Geometry.WGS84.replace('(', ' ').replace(')', ' ').split(' ')[3];
   });

    // geoData.latitude = delayList[0].Geometry.WGS84.replace('(', ' ').replace(')', ' ').split(' ')[2];

    // const test = delayList[0].Geometry.WGS84.replace('(', ' ').replace(')', ' ').split(' ')[3];
    // //const test2 = test.split(')');

    

    //TODO:
    // setting station marker
    useEffect(() => {
        (async () => {
            setMarker(<Marker
                coordinate={{
                    // latitude: parseFloat(57.538628927780955), 
                    // longitude: parseFloat(12.10077643689166)
                    
                    latitude: parseFloat(geoData.latitude), 
                    longitude: parseFloat(geoData.longitude)
                }}
                title={delayList.AdvertisedLocationNam} 
                pinColor="yellow"
            />);
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

            setLocationMarker(<Marker
                coordinate={{
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude
                }}
                title="Min plats"
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
                    <Marker
                        coordinate={{ 
                            latitude: 56.17, 
                            longitude: 15.59 }}
                        title="Min första markör"
                    />
                    {locationMarker}
                    {marker}
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