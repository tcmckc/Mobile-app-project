import config from "../config/config.json";
import Stations from "../interfaces/stations";

const stations = {
    getStations: async function getStations(): Promise<Stations[]> {
        const response = await fetch ('https://trafik.emilfolino.se/stations');

        // const response = await fetch(`${config.base_url}/delayed?api_key=${config.api_key}`);

        const result = await response.json();

        return result.data;
    },
};

export default stations;
