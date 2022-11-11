import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text } from 'react-native';
import { Base, Typography } from '../styles';

export default function Favorite() {
    return (
        <ScrollView style={Base.base}>
            <Text style={Typography.header2}>My page</Text>
            <StatusBar style="auto" />
        </ScrollView>
    );
};
