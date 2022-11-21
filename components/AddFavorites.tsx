import { useEffect, useState } from 'react';
import { ScrollView, Text, Button, View } from 'react-native';
import { Base, Typography, Table } from '../styles';
import stationModel from '../models/stations.ts';
import { DataTable } from "react-native-paper";

export default function AddFavorites ({ navigation, route }) {
    const { item } = route.params;


    return (
        <View style={Base.base}>
            <Text style={Typography.header2}>Add "{item}" to my favorites
            </Text>
            <View style={Base.btn}>
                <Button
                    title="Yes"
                    onPress={() => {
                        navigation.navigate('Favorites', {
                            item: item
                        });
                    }}
                />
            </View>
            <Text></Text>
            <View style={Base.btn}>
                <Button
                    title="Back to list"
                    onPress={() => {
                        navigation.navigate('Stations');
                    }}
                />
            </View>
        </View>

    );

};