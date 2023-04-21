import styles from "@/styles/Overview.module.css";
import Humidity from "./Humidity";
import WindSpeed from "./WindSpeed";
import Visibility from "./Visibility";
import Pressure from "./Pressure";

interface Props {
	lat: string;
	lon: string;
}

export default function Overview(props: Props) {
	return (
		<section className={styles.overview_section}>
			<div className={styles.overview_heading_wrapper}>
				<h3>Overview</h3>
			</div>
			<div className={styles.overview_card_container}>
				<Humidity {...props} />
				<WindSpeed {...props} />
				<Visibility {...props} />
				<Pressure {...props} />
			</div>
		</section>
	);
}
