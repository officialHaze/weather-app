import axios from "axios";

interface Coordinates {
	lat: string;
	lon: string;
}

// export default async function getLocalTime(coordinates: Coordinates) {
// 	try {
// 		const { data } = await axios.get(
// 			`https://api-bdc.net/data/timezone-by-location?key=${process.env.NEXT_PUBLIC_BIGDATACLOUD_API_KEY}&latitude=${coordinates.lat}&longitude=${coordinates.lon}`,
// 		);

// 		return data.localTime;
// 	} catch (err) {
// 		throw err;
// 	}
// }

export default async function getLocalTime(coordinates: Coordinates) {
	const localTime = new Date();
	return localTime.toLocaleString("en-US");
}
