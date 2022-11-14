import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ScrollView, Text, Button, View } from 'react-native';
import { Base, Typography, Table } from '../styles';
import delayModel from '../models/delays.ts';
import stationModel from '../models/stations.ts';
import { DataTable } from "react-native-paper";
import authModel from '../models/auth';

export default function DelayList({ navigation }) {
    const [delays, setDelays] = useState([]);
    const [stations, setStations] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

    useEffect(() => {
        (async () => {
            setIsLoggedIn(await authModel.loggedIn());
            });
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

    useEffect(() => {
        (async () => {
            setStations(await stationModel.getStations());
        })();
    }, []);

    const delayList = delays.map(item => ({
        ...stations.find(({ LocationSignature }) =>
        item.FromLocation[0].LocationName == LocationSignature), ...item 
    }));

    const stationName = delayList.map((item, index) => {
        if (item.AdvertisedLocationName !== undefined) {
            return <DataTable.Row key={index}>
            
                <Button 
                    setIsLoggedIn={setIsLoggedIn}
                    key={index} 
                    onPress={() => { 
                        navigation.navigate('Details', { item: item });
                    }}
                    title={item.EstimatedTimeAtLocation.substring(0,10)}
                >
                </Button>

                <Button 
                    setIsLoggedIn={setIsLoggedIn}
                    key={index} 
                    onPress={() => { 
                        navigation.navigate('Details', { item: item });
                    }}
                    title={item.AdvertisedLocationName}
                >
                </Button>
            </DataTable.Row>
        }
        
            {/* {isLoggedIn ?
                <Button
                    setIsLoggedIn={setIsLoggedIn}
                    title="♡♡"
                    onPress={() => {
                        console.log("♡ pressed")
                    }}
                >
                </Button> :
                <Button
                    title="♡"
                    onPress={() => {
                        console.log("pressed")
                    }}
                >
                </Button>
                } */}

    });

    return (
        <ScrollView style={Base.base}>
            <Text style={Typography.header2}>Delayed information
            </Text>

            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Date</DataTable.Title>
                    <DataTable.Title>Station name</DataTable.Title>
                </DataTable.Header>
                {stationName}
            </DataTable>
        </ScrollView>
    );
};
