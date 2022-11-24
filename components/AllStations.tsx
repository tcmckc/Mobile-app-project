import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ScrollView, Text, Button, View } from 'react-native';
import { Base, Typography, Table } from '../styles';
import stationModel from '../models/stations.ts';
import { DataTable } from "react-native-paper";


export default function AllStations( { navigation }) {

    const [stations, setStations] = useState([]);

    useEffect(() => {
        (async () => {
            setStations(await stationModel.getStations());
        })();
    }, []);
   

    const stationNames = stations.map((item, index) => {
        if (item.AdvertisedLocationName !== undefined) {
            return (
                <DataTable.Row key={index}>
                    <DataTable.Cell style={Table.table.cell}>
                        <Button
                            title={item.AdvertisedLocationName}
                            onPress={() => {
                                navigation.navigate('Add', {
                                    item: item.AdvertisedLocationName
                                });
                            }}
                            key={index}
                        />
                    </DataTable.Cell>
                </DataTable.Row>
            );
        }
    });


    return (
        <ScrollView style={Base.base}>
            <Text style={Typography.header2}>Station list</Text>
            <DataTable style={Table.table.container}>
                <DataTable.Title>Station name</DataTable.Title>
            </DataTable>
            {stationNames}
        </ScrollView>
    )
}