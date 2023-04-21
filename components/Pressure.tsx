import { useCurrentWeather, useDiff } from "@/lib/hooks";
import DiffMeter from "./DiffMeter";
import styles from "@/styles/Overview.module.css";

interface Props {
	lat: string;
	lon: string;
}

export default function Pressure({ lat, lon }: Props) {
	const weather = useCurrentWeather(lat, lon);
	const pressureDiff = useDiff("pressure", lat, lon);

	return (
		<div className={styles.overview_card}>
			<div>
				<h1>Pressure</h1>
				<h1 className={styles.overview_value}>{weather?.main.pressure} hpa</h1>
			</div>
			<DiffMeter diff={pressureDiff} />
		</div>
	);
}
