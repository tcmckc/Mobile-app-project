import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, Button, View } from 'react-native';
import { Base, Typography } from '../styles';
import { useEffect, useState } from 'react';
import { DataTable } from 'react-native-paper';
import delayModel from '../models/delays.ts';
import stationModel from '../models/stations.ts';
import storage from "../models/storage";


export default function Favorites({ navigation, route, setIsLoggedIn }) {
    const [favorites, setFavorites] = useState([]);
    const [myList, setMyList] = useState([]);
    const { item } = route.params || {};

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

    useEffect(() => {
        (async () => {
            if (item !== undefined ) {
                await setFavorites([...favorites, item]);
            }
        })();
    }, [item]);

    const delayStations = [];
    myList.map(item => {
        delayStations.push(item.AdvertisedLocationName);
    });

    const listOfFavorites = favorites.map((item, index) => {
            if (delayStations.includes(item)){
                return (
                    <DataTable.Row key={index}>
                        <DataTable.Cell style={{paddingTop:10}}>{item} </DataTable.Cell>
                        <DataTable.Cell style={{paddingTop:10, color:"red"}}> (Train Delay!)</DataTable.Cell>
                    </DataTable.Row>
                )
            } else {
                return (
                    <DataTable.Row key={index}>
                        <DataTable.Cell style={{paddingTop:10}}>{item} </DataTable.Cell>
                        <DataTable.Cell style={{paddingTop:10}}></DataTable.Cell>
                    </DataTable.Row>
                )

            }
    });

    async function logOut() { 
        storage.deleteToken();
        setIsLoggedIn(false);
    }

    return (
        <ScrollView style={Base.base}>
            <Text style={Typography.header2}>My Favorite Stations </Text>

            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Station name</DataTable.Title>
                    <DataTable.Title>Information</DataTable.Title>
                </DataTable.Header>
                {listOfFavorites}
            </DataTable>

            <Text></Text>

            <View style={Base.btn}>
                <Button 
                    title="Add more stations"
                    onPress={() => {
                        navigation.navigate('Stations', {
                        });
                    }}
                />
            </View>
            <View style={Base.btn}>
                <Button
                title="Logga ut"
                onPress={async () => {
                    await logOut()
                }}
                />
            </View>
        </ScrollView>
    );
}
