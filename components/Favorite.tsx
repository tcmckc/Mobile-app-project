import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text } from 'react-native';
import { Base, Typography } from '../styles';
import DelayList from './DelayList.tsx';
import AllStations from './AllStations';
import Favorites from './Favorites.tsx';
import AddFavorites from './AddFavorites.tsx';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { accessibilityProps } from 'react-native-paper/lib/typescript/components/MaterialCommunityIcon';

const Stack = createNativeStackNavigator();

export default function Favorite(props) {
    return (
        <Stack.Navigator initialRouteName="Favorites">
            {/* <Stack.Screen name="Favorites" component={Favorites} /> */}

            <Stack.Screen name="Favorites">
                {(screenProps) => <Favorites {...screenProps} setIsLoggedIn={props.setIsLoggedIn} />}
            </Stack.Screen>

            <Stack.Screen name="Stations" component={AllStations}>
                
            {/* 以下で書くと、次の画面でnavigation.navigateが使えない */}
            {/* {() => <AllStations myList={myList} setMyList={setMyList} />} */}
            </Stack.Screen>
            
            <Stack.Screen name="Add" component={AddFavorites} />
        </Stack.Navigator>
    );
}
