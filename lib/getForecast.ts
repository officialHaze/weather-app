import axios from "axios";

export default async function getForecast(lat: string, lon: string) {
	try {
		const { data } = await axios.get(
			`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}&units=metric`,
		);
		return data.list;
	} catch (err) {
		throw err;
	}
}
