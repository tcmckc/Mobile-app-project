import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text } from 'react-native';
import { Base, Typography } from '../styles';
import DelayList from './DelayList.tsx';
import Favorites from './Favorites.tsx';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

//TODO:
// 駅一覧の画面（お気に入り追加ができる）と、
// お気に入り一覧の画面（遅延があるかどうか表示）

export default function Favorite() {
    return (
        <Stack.Navigator initialRouteName="Favorites">
            <Stack.Screen name="Favorites" component={Favorites} />
            <Stack.Screen name="Add" component={DelayList} />
        </Stack.Navigator>
    );
}
