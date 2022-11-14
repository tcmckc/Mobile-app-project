import { View, Text } from "react-native";
import { Base, Typography } from '../styles';


export default function DelayDetails({ route }) {
    const { item } = route.params;

    console.log(item.EstimatedTimeAtLocation);

    return (
        <View style={Base.base}>
            <Text style={Typography.header2}>{item.AdvertisedLocationName}</Text>

            <Text style={Typography.normal}>Event:  
                {item.ActivityType}</Text>
            <Text style={Typography.normal}>Departure date: {item.AdvertisedTimeAtLocation.substring(0,10)}</Text>

            <Text style={Typography.normal}>Former departure time: {item.AdvertisedTimeAtLocation.substring(11,16)}</Text>

            <Text style={Typography.normal}>Updated departure time: {item.EstimatedTimeAtLocation.substring(11,16)}</Text>

        </View>

    )
}