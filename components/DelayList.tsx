import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ScrollView, Text, Button, View } from 'react-native';
import { Base, Typography } from '../styles';
import delayModel from '../models/delays.ts';
import stationModel from '../models/stations.ts';

export default function DelayList({ navigation }) {
    const [delays, setDelays] = useState([]);
    const [stations, setStations] = useState([]);
    //const [names, setNames] = useState([]);

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

    // useEffect(() => {
    //     (async() => {
    //         const allNames = [];
    //         await delays.forEach(function(value) {
    //             if (value["FromLocation"] !== undefined) {
    //                 allNames.push(value);
    //             };
    //         });
    //         setNames(allNames);
    //     });
    // }, []);

    // 新しいリストfooに、FromLocationあるデータのみ格納していく
    const foo = [];
    delays.forEach(function (value) {
        if (value["FromLocation"] !== undefined) {
            foo.push(value);
        }
    });

    // 新しいリストsigに、LocationSignatureデータのみ格納
    const sig = [];
    stations.forEach(function (value) {
        sig.push(value["LocationSignature"]);
    })
    // console.log(sig);
    // console.log(",,,,");
    
    //console.log(stations.AdvertisedLocationName); //undefined
    //console.log(foo[0]); //ok

    //stationsのLocationSignature[0]を全て出力 ok
    // stations.map((item) => {
    //     console.log(item.LocationSignature[0]);
    // });

    // fooののLocationName出力 ok
    // foo.map((item) => {
    //     console.log(item.FromLocation[0].LocationName);
    // });

    foo.map((item) => {
        for (let i = 0; i < sig.length; i++) {
            if (item.FromLocation[0].LocationName == [i]) {
                console.log(stations.AdvertisedLocationName);
            }
        }
    });

    const delayList = foo.map(item => ({
        ...stations.find(({ LocationSignature }) =>
        item.FromLocation[0].LocationName == LocationSignature), ...item 
    }));

    //FIXME: buttom must be a string
    const stationName = delayList.map((item, index) => {
        return (

            <Button 
                title="item.AdvertisedLocationName"
                key={index} 
                onPress={() => { 
                    navigation.navigate('Details', { item: item });
                }}
            >
            </Button>
        );
    });


    //console.log(delayList[0].Geometry.WGS84);
    //console.log(delayList[0].AdvertisedLocationName);
    //console.log("///////");
    

    return (
        <ScrollView style={Base.base}>
            <Text style={Typography.header2}>Delayed trains
            </Text>
            {stationName}
        </ScrollView>
    );
}

// return <Text key={index} style={Typography.normal}>
//             { item.AdvertisedLocationName }
//         </Text>

// TODO:
    // trains.FromLocation.LocationName == stations.LocationSignatureについてstations.AdvertisedLocationNameを出力する

    // const delayList1 = delays.map(item => ({
    //     ...stations.find(({ LocationSignature }) => item.FromLocation[0].LocationName == LocationSignature), ...item,
    // }));
    // console.log(delayList1);
    // console.log("以上");

    // const delayList = delays.map(delay =>
    //     <Text style={Typography.normal}>
    //         { delay.FromLocation[0].LocationName }
    //     </Text>
    // );


    // テスト：fooを使って、FromLocationが"Thnのデータのみ取得して、
    // stationsデータから駅名を出力
    // const getStationName = (foo, stations) => {
    //     foo.forEach(function (f) {
    //         stations.forEach(function (s) {
    //             if (f["FromLocation"]["LocationName"] == s["LocationSignature"]) {
    //                 console.log(s["AdvertisedLocationName"]);
    //             }
    //         });
    //     });
    // };

    // const stationList = stations.filter(stations => stations.LocationSignature == foo.FromLocation.LocationName).map((item, index) => {
    //     return <Text key={index} style={Typography.normal}>
    //         { foo.FromLocation.LocationName }
    //         {/* { stations.AdvertisedLocationName } */}
    //     </Text>
    // })
   
    //getStationName();

    // })
    //     <Text key={index} style={Typography.normal}>
    //         {item.FromLocation[0].LocationName}
    //     </Text>
    // );

    //console.log(delayList);

    // const delayList = arr
    //     .filter((item) => {
    //     return item.FromLocation[0].LocationName.includes("Bb");
    // });

    // const delayList1 = delayList.map((delay, index) =>
    //     <Text>
    //         {delay.FromLocation[0].LocationName }
    //     </Text>
    // );

    // const stationList = stations?.map((stations, index) => 
    //     <Text key={index} style={Typography.normal}>
    //         { stations.AdvertisedLocationName }
    //     </Text>
    // );

    // const delayedTrainsList = stations?.filter(stations => stations.LocationSignature === trains.FromLocation.LocationName).map((stations, index) => {
    //     return <Text key={index} style={Typography.normal}>
    //         { stations.AdvertisedLocationName }
    //     </Text>
    // });
