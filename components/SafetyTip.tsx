import { useCurrentWeather } from "@/lib/hooks";
import { tempSerializer } from "@/lib/serializers";
import { useState, useEffect } from "react";
import checkWeatherSeverity from "@/lib/checkWeatherSeverity";
import ThermIcon from "./ThermIcon";
import Tip from "./Tip";
import styles from "@/styles/SafetyTip.module.css";

interface Props {
	lat: string;
	lon: string;
}

export default function SafetyTip({ lat, lon }: Props) {
	const [severity, setSeverity] = useState<string | null>(null);
	const weather = useCurrentWeather(lat, lon);
	useEffect(() => {
		if (weather) {
			const weatherSeverityArgs = {
				temp: weather.main.temp,
				feels_like: weather.main.feels_like,
			};
			const tempSeverity = checkWeatherSeverity(weatherSeverityArgs);
			setSeverity(tempSeverity);
		}
	}, [weather]);

	return (
		<section className={styles.safety_tip_container}>
			<div>
				<h2>{weather && tempSerializer(weather?.main.temp)}°</h2>
			</div>
			<ThermIcon severity={severity} />
			<Tip severity={severity} />
		</section>
	);
}
