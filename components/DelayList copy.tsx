import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ScrollView, Text, Button, View } from 'react-native';
import { Base, Typography, Table } from '../styles';
import delayModel from '../models/delays.ts';
import stationModel from '../models/stations.ts';
import { DataTable } from "react-native-paper";
import authModel from '../models/auth';
import delays from '../models/delays';

export default function DelayList({ navigation }) {
    const [delays, setDelays] = useState([]);
    const [stations, setStations] = useState([]);
    const [myList, setMyList] = useState([]);

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

    useEffect(() => {
        (async () => {
            setStations(await stationModel.getStations());
        })();
    }, []);

    useEffect(() => {
        (async () => {
            setMyList(await delays.map(item => ({
                ...stations.find(({ LocationSignature }) =>
                item.FromLocation[0].LocationName == LocationSignature), ...item})))
        })();
    }, []);

    // const delayList = delays.map(item => ({
    //     ...stations.find(({ LocationSignature }) =>
    //     item.FromLocation[0].LocationName == LocationSignature), ...item 
    // }));

    const stationName = myList.map((item, index) => {
        if (item.AdvertisedLocationName !== undefined) {
            return <DataTable.Row key={index}>
            
                <Text style={{paddingTop:10}}>{item.EstimatedTimeAtLocation.substring(0,10)}
                </Text>

                <Text style={{paddingTop:10, paddingLeft:10}}>{item.EstimatedTimeAtLocation.substring(11,16)}
                </Text>

                <Button
                    key={index} 
                    onPress={() => { 
                        navigation.navigate('Details', { item: item });
                    }}
                    title={item.AdvertisedLocationName}
                >
                </Button>

            </DataTable.Row>
        }
        
    });

    return (
        <ScrollView style={Base.base}>
            <Text style={Typography.header2}>Delay List
            </Text>

            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Date</DataTable.Title>
                    <DataTable.Title>Time</DataTable.Title>
                    <DataTable.Title>Station name</DataTable.Title>
                </DataTable.Header>
                {stationName}
            </DataTable>
        </ScrollView>
    );
};
