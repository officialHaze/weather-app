import cityDetailsSerializer from "./serializers";
import axios from "axios";

export const getCityCoordinates = async (cityName: string) => {
	const { data } = await axios.get(
		`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=73652c4b6d8d79969afcc8c1e0f43482`,
	);
	const serialized_data = cityDetailsSerializer(data[0]);
	return serialized_data;
};
