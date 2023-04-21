interface CachedData {
	city: string;
	lat: string;
	lon: string;
	country: string;
}

export default function isDataCached() {
	const data = localStorage.getItem("city_coordinates");
	if (data) {
		try {
			const details: CachedData = JSON.parse(data);
			return details && true;
		} catch (err) {
			return false;
		}
	} else {
		return false;
	}
}
