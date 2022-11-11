import config from "../config/config.json";
import Delays from "../interfaces/delays";

const delays = {
    getDelays: async function getDelays(): Promise<Delays[]> {
        const response = await fetch ('https://trafik.emilfolino.se/delayed');

        // const response = await fetch(`${config.base_url}/delayed?api_key=${config.api_key}`);

        const result = await response.json();

        return result.data;
    },
};

export default delays;
