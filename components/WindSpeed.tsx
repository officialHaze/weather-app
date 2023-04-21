import { useCurrentWeather, useDiff } from "@/lib/hooks";
import DiffMeter from "./DiffMeter";
import styles from "@/styles/Overview.module.css";

interface Props {
	lat: string;
	lon: string;
}

export default function WindSpeed({ lat, lon }: Props) {
	const weather = useCurrentWeather(lat, lon);
	console.log(weather?.wind.speed);

	const speedDiff = useDiff("wind", lat, lon);
	return (
		<div className={styles.overview_card}>
			<div>
				<h1>Wind Speed</h1>
				<h1 className={styles.overview_value}>{weather?.wind.speed} km/hr</h1>
			</div>
			<DiffMeter diff={speedDiff} />
		</div>
	);
}
