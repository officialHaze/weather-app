interface Data {
	name: string;
	lat: string;
	lon: string;
	country: string;
}

interface CachedData {
	city: string;
	lat: string;
	lon: string;
	country: string;
}

export default function cityDetailsSerializer(data: Data): object {
	const serializer = {
		city: data.name,
		country: data.country,
		lat: data.lat,
		lon: data.lon,
	};
	return serializer;
}

export const cachedDataSerializer = (data: string | null): CachedData | null => {
	if (data) {
		const details: CachedData = JSON.parse(data);
		return details;
	} else {
		return null;
	}
};

export const localTimeSerializer = (localTime: string) => {
	const newDate = new Date(localTime);
	const serializedTime = newDate.toLocaleTimeString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
	});
	return serializedTime;
};

export const localTime24HourSerializer = (localTime: string) => {
	const newDate = new Date(localTime);
	const serializedTime = newDate.toLocaleTimeString("en-US", {
		hour12: false,
	});
	return serializedTime;
};

export const tempSerializer = (temp: number | null) => {
	if (temp) {
		return Math.round(temp).toString();
	}
	return null;
};
