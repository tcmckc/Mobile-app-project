import { View, Text } from "react-native";
import { Base, Typography } from '../styles';


export default function DelayDetails({ route }) {
    const { item } = route.params;

    return (
        <View style={Base.base}>
            <Text style={Typography.header2}>{item.AdvertisedLocationName}</Text>
            <Text style={Typography.normal}>Event:  
                {item.ActivityType}</Text>
            <Text style={Typography.normal}>Departure Time: {item.AdvertisedTimeAtLocation}</Text>
            <Text style={Typography.normal}>Current Departure Time: {item.EstimatedTimeAtLocation}</Text>
        </View>

    )
}