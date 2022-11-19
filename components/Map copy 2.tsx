import { Text, View, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { Base, Typography } from '../styles';

import MapView from 'react-native-maps';
import { Marker } from "react-native-maps";
import * as Location from 'expo-location';
import delayModel from '../models/delays.ts';
import stationModel from '../models/stations.ts';


export default function ShowMap( route ) {
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

    // const getDelayList = async ()=> {
    //     const delayList = await delays.map(item => ({
    //         ...stations.find(({ LocationSignature }) =>
    //         item.FromLocation[0].LocationName == LocationSignature), ...item 
    //     }));
    //     return delayList;

    if (stations !== undefined && delays !== undefined) {
        const delayList = delays.map(item => ({
            ...stations.find(({ LocationSignature }) =>
            item.FromLocation[0].LocationName == LocationSignature), ...item 
        }));

    console.log(stations[0]);
    console.log(111);
    console.log(delays[0]);
    console.log(222);
    console.log(delayList[0]);
    console.log(333);

}

    

//     interface Geometry {
//         latitude: Number;
//         longitude: Number;
//     }


//     //TODO:
//     // setting station marker
//     useEffect(() => {
//         (async () => {

//             if (delayList !== null) {
//                 const geoData: Geometry = {};

//                 console.log(delayList);

//                 geoData.longitude = await delayList.map(item => {
//                     if (item.Geometry !== undefined) {
//                         return item.Geometry.WGS84.replace('(', ' ').replace(')', ' ').split(' ')[2];
//                     }
//                 });

//                 geoData.latitude =  await delayList.map(item => {
//                     if (item.Geometry !== undefined) {
//                         return item.Geometry.WGS84.replace('(', ' ').replace(')', ' ').split(' ')[3];
//                     }
//                 });

//                 console.log(geoData);

//                 setStationMarker(<Marker
//                     coordinate={{
//                         longitude: parseFloat(geoData.longitude), 
//                         latitude: parseFloat(geoData.latitude)
//                     }}
//                     title={delayList.AdvertisedLocationName} 
//                     pinColor="orange"
//                 />);
//             }
//         })();
//     }, []);

//     // setting user's current location marker
//     useEffect(() => {
//         (async () => {
//             const { status } = await Location.requestForegroundPermissionsAsync();

//             if (status !== 'granted') {
//                 setErrorMessage('Permission to access location was denied');
//                 return;
//             }
//             const currentLocation = await Location.getCurrentPositionAsync({});

//             setCurrentLocationMarker(<Marker
//                 coordinate={{
//                     latitude: currentLocation.coords.latitude,
//                     longitude: currentLocation.coords.longitude
//                 }}
//                 title="Current position"
//                 pinColor="blue"
//             />);
//         })();
//     }, []);


//     return (
//         <View style={Base.base}>
//             <Text style={Typography.header2}>Delayed trains</Text>
//             <View style={styles.container}>
//                 <MapView
//                     style={styles.map}
//                     initialRegion={{
//                         latitude: 56.1612,
//                         longitude: 15.5869,
//                         latitudeDelta: 0.1,
//                         longitudeDelta: 0.1,
//                     }}>
//                     {/* <Marker
//                         coordinate={{ 
//                             latitude: 56.17, 
//                             longitude: 15.59 }}
//                         title="Min första markör"
//                     /> */}
//                     {currentLocationMarker}
//                     {stationMarker}
//                 </MapView>
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: "flex-end",
//         alignItems: "center",
//     },
//     map: {
//         ...StyleSheet.absoluteFillObject,
//     },
//});
