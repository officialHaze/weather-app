import axios from "axios";

export default async function getCurrentWeather(lat: string, lon: string) {
	try {
		const { data } = await axios.get(
			`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}&units=metric`,
		);
		return data;
	} catch (err) {
		throw err;
	}
}
