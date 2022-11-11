import { StatusBar } from 'expo-status-bar';
//import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Base } from './styles';
import Home from './components/Home';
import Delay from './components/Delay';
import Map from './components/Map';
import Auth from './components/auth/Auth';
import Favorite from './components/Favorite';
import { useEffect, useState } from 'react';
import authModel from './models/auth';
import FlashMessage from "react-native-flash-message";

const Tab = createBottomTabNavigator();
const routeIcons = {
  "Home": "home",
  "Delay": "time",
  "Map": "map",
  "Log in": "lock-closed",
  "Favorite": "heart",
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

  useEffect(() => {
    (async () => {
      setIsLoggedIn(await authModel.loggedIn());
    });
   }, []);

  return (
    <SafeAreaView style={Base.container}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName = routeIcons[route.name] || "alert";
                return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'green',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Delay" component={Delay} />
          <Tab.Screen name="Map" component={Map} />

          {isLoggedIn ?
              <Tab.Screen name="Favorite">
                {() => <Favorite setIsLoggedIn={setIsLoggedIn} />}
              </Tab.Screen> :
              <Tab.Screen name="Log in">
                {() => <Auth setIsLoggedIn={setIsLoggedIn} />}
              </Tab.Screen> 
            }

        </Tab.Navigator>
      </NavigationContainer>

      {/* <View style={Base.base}>
        <Text>Tågtrafik</Text>
        <Image source={train} style={{ width: 320, height: 240 }} />
        <Station />
        <StatusBar style="auto" />
      </View> */}

      <StatusBar style="auto" />
    <FlashMessage position="top" />
    </SafeAreaView>
  );
}
