import { tempSerializer } from "./serializers";

interface Props {
	temp: number;
	feels_like: number;
}

export default function checkWeatherSeverity({ temp, feels_like }: Props) {
	const serialized_temp = tempSerializer(temp);
	const serialized_actual_temp = tempSerializer(feels_like);

	if (serialized_temp) {
		const tempInt = parseInt(serialized_temp);
		if (tempInt > 40) return "severe_high";
		else if (tempInt >= 35 && tempInt <= 40) return "high";
		else if (tempInt >= 30 && tempInt <= 34) return "moderate";
		else if (tempInt >= 20 && tempInt <= 29) return "normal";
		else if (tempInt >= 10 && tempInt <= 19) return "low";
		else if (tempInt < 10) return "severe_low";
	}
	return null;
}
