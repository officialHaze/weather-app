import styles from "@/styles/Details.module.css";
import ForecastToday from "./ForecastToday";
import SafetyTip from "./SafetyTip";
import Overview from "./Overview";
import LineChart from "./LineChart";
import { TiArrowBack } from "react-icons/ti";

interface Props {
	lat: string;
	lon: string;
	showDetails: boolean;
	handleClick: () => void;
}

export default function Details(props: Props) {
	return (
		<section
			className={styles.details}
			style={{
				transform: props.showDetails ? "translateX(0)" : "translateX(100%)",
			}}>
			<div className={styles.back_btn}>
				<TiArrowBack onClick={props.handleClick} />
			</div>
			<div className={styles.heading}>
				<h3 style={{ textAlign: "center" }}>Today's Forecast</h3>
			</div>
			<ForecastToday {...props} />
			<div className={styles.extra_details}>
				<SafetyTip {...props} />
				<LineChart {...props} />
			</div>
		</section>
	);
}
