import styles from "@/styles/SafetyTip.module.css";

interface Props {
	severity: string | null;
}

export default function ThermIcon({ severity }: Props) {
	return severity ? (
		<div className={styles.therm_icon_wrapper}>
			{severity === "severe_high" && (
				<img
					className={styles.therm_icon}
					src="/weather_icons/severe-high-temperature-therm.png"
					alt="thermometer"
				/>
			)}
			{severity === "high" && (
				<img
					className={styles.therm_icon}
					src="/weather_icons/high-temperature-therm.png"
					alt="thermometer"
				/>
			)}
			{severity === "moderate" && (
				<img
					className={styles.therm_icon}
					src="/weather_icons/moderate-temperature-therm.png"
					alt="thermometer"
				/>
			)}
			{severity === "normal" && (
				<img
					className={styles.therm_icon}
					src="/weather_icons/normal-temperature-therm.png"
					alt="thermometer"
				/>
			)}
			{severity === "low" && (
				<img
					className={styles.therm_icon}
					src="/weather_icons/low-temperature-therm.png"
					alt="thermometer"
				/>
			)}
			{severity === "severe_low" && (
				<img
					className={styles.therm_icon}
					src="/weather_icons/severe-low-temperature-therm.png"
					alt="thermometer"
				/>
			)}
		</div>
	) : (
		<div />
	);
}
