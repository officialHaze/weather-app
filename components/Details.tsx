import styles from "@/styles/Details.module.css";
import { useState, useEffect } from "react";
import ForecastToday from "./ForecastToday";
import SafetyTip from "./SafetyTip";
import Overview from "./Overview";
import FiveDayAverageTemp from "./FiveDayAverageTemp";

interface Props {
	lat: string;
	lon: string;
	showDetails: boolean;
	handleClick: () => void;
}

export default function Details(props: Props) {
	return (
		<section
			onClick={props.handleClick}
			className={styles.details}
			style={{
				transform: props.showDetails ? "translateX(0)" : "translateX(100%)",
			}}>
			<hr className={styles.hr} />
			<div className={styles.heading}>
				<h3 style={{ textAlign: "center" }}>Today's Forecast</h3>
			</div>
			<ForecastToday {...props} />
			<div className={styles.extra_details}>
				<SafetyTip {...props} />
				<FiveDayAverageTemp {...props} />
			</div>
		</section>
	);
}
