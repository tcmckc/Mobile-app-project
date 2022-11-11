import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, Image } from 'react-native';
import train from './../assets/train.jpg';
import { Base, Typography } from '../styles';

export default function Home() {
    return (
        <ScrollView style={Base.base}>
            <Text style={Typography.header1}>Train traffic</Text>
            <Image source={train} style={Base.image} />
            <Text style={Typography.header2}>Welcome</Text>
            <Text style={Typography.normal}>Here you can find delayed train information.</Text>
            <StatusBar style="auto" />
        </ScrollView>
    );
}