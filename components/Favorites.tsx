import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, Button, View } from 'react-native';
import { Base, Typography } from '../styles';
import { useEffect, useState } from 'react';
import { DataTable } from 'react-native-paper';
import delayModel from '../models/delays.ts';
import stationModel from '../models/stations.ts';


export default function Favorites({ navigation, route }) {
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

    console.log(favorites);
    console.log(88)

    const delayStations = [];
    myList.map(item => {
        delayStations.push(item.AdvertisedLocationName);
    });

    //TODO: map in mapがダメ？
    const listOfFavorites = favorites.map(item => {
            if (delayStations.includes(item)){
                return (
                    <DataTable.Row>
                        <Text style={{paddingTop:10}}>{item} </Text>
                        <Text style={{paddingTop:10, color:"red"}}> (Train Delay!)</Text>
                    </DataTable.Row>
                )
            } else {
                return (
                    <DataTable.Row>
                        <Text style={{paddingTop:10}}>{item} </Text>
                        <Text style={{paddingTop:10}}></Text>
                    </DataTable.Row>
                )

            }
    });

    // const listOfFavorites = favorites.map(item => {
    //     myList.map(ii => {
    //         if (ii.AdvertisedLocationName === item) {
    //             return (
    //                 <DataTable.Row>
    //                     <Text style={{paddingTop:10}}>{item}</Text>
    //                     <Text style={{paddingTop:10}}></Text>
    //                 </DataTable.Row>)
    //         } 

    //         return (<DataTable.Row>
    //         <Text style={{paddingTop:10}}>{item}</Text>
    //         <Text style={{paddingTop:10}}></Text>
    //         </DataTable.Row>)
    //     })
    // });
    
    console.log(listOfFavorites)
    console.log(3453453)

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
        </ScrollView>
    );
}
