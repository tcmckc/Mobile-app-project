import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, Button, View } from 'react-native';
import { Base, Typography } from '../styles';
import { useEffect, useState } from 'react';


export default function Favorites({ navigation, route }) {
    const [favorites, setFavorites] = useState([]);
    const { item } = route.params || {};

    console.log(favorites);
    console.log(item);
    console.log(88);

    if(item !== undefined) {
        console.log(item)
        console.log(4)
    }

    useEffect(() => {
        (async () => {
            if (item !== undefined ) {
                await setFavorites([...favorites, item]);
            }
        })();
    }, [item]);

    const listOfFavorites = favorites.map((item, index) => {
        return <Button
                    title={item}
                    key={index}
                />
    });
    console.log(favorites);
    console.log(22)

    return (
        <ScrollView style={Base.base}>
            <Text style={Typography.header2}>My Favorite Stations </Text>

            {listOfFavorites}

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
