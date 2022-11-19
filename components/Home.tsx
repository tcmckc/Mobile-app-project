import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, Image } from 'react-native';
import train from './../assets/train.png';
import { Base, Typography } from '../styles';

export default function Home() {
    return (
        <ScrollView style={Base.base}>
            <Text style={Typography.header1}>TRAIN DELAY INFORMATION</Text>
            <Image source={train} style={Base.image} />
            <Text style={Typography.header2}>Welcome</Text>
            <Text style={Typography.normal}>Check latest train delays with this app. We cover infomation all over Sweden! 
            You can login and save your favorite stations as well.</Text>
            <StatusBar style="auto" />
        </ScrollView>
    );
}