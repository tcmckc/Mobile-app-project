import { useEffect, useState } from 'react';
import { ScrollView, Text, Button, View } from 'react-native';
import { Base, Table, Typography } from '../styles';
import delayModel from '../models/delays.ts';
import stationModel from '../models/stations.ts';
import { DataTable } from "react-native-paper";

export default function DelayList({navigation}) {
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

    const stationName = myList.map((item, index) => {
        if (item.AdvertisedLocationName !== undefined) {
            return <DataTable.Row key={index}>
            
                <DataTable.Cell style={Table.cell}>{item.EstimatedTimeAtLocation.substring(0,10)}
                </DataTable.Cell>

                <DataTable.Cell style={Table.cell}>{item.EstimatedTimeAtLocation.substring(11,16)}
                </DataTable.Cell>

                <DataTable.Cell style={Table.cell}>
                    <Button
                        key={index} 
                        onPress={() => { 
                            navigation.navigate('Details', { item: item });
                        }}
                        title={item.AdvertisedLocationName}
                    >
                    </Button>
                </DataTable.Cell>

            </DataTable.Row>
        }
    
    });

    return (
        <ScrollView style={Base.base}>
            <Text style={Typography.header2}>Delay List
            </Text>
            <Text>All tain delays in Sweden for the next 14 hours.</Text>
            <Text></Text>

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
