import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DelayList from './DelayList.tsx';
import DelayDetails from './DelayDetails.tsx';

const Stack = createNativeStackNavigator();

export default function Delay() {
    return (
        <Stack.Navigator initialRouteName="List">
            
            <Stack.Screen name="List" component={DelayList}>
            </Stack.Screen>

            <Stack.Screen name="Details" component={DelayDetails}>
            </Stack.Screen>
        </Stack.Navigator>
    );
}
