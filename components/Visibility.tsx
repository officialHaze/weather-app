import { useCurrentWeather, useDiff } from "@/lib/hooks";
import DiffMeter from "./DiffMeter";
import styles from "@/styles/Overview.module.css";

interface Props {
	lat: string;
	lon: string;
}

export default function Visibility({ lat, lon }: Props) {
	const weather = useCurrentWeather(lat, lon);
	const visibilityDiff = useDiff("visibility", lat, lon);
	return (
		<div className={styles.overview_card}>
			<div>
				<h1>Visibility</h1>
				<h1 className={styles.overview_value}>
					{weather ? weather.visibility / 1000 : 0} kms
				</h1>
			</div>
			<DiffMeter diff={visibilityDiff} />
		</div>
	);
}
