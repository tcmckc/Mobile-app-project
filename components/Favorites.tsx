import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text } from 'react-native';
import { Base, Typography } from '../styles';




export default function Favorites() {
    const [favorites, setFavorites] = useState([]);

    
    return (
        <ScrollView style={Base.base}>
            <Text style={Typography.header2}>My favorite station list</Text>
        </ScrollView>
    );
}
