import styles from "@/styles/SafetyTip.module.css";

interface Props {
	severity: string | null;
}

export default function Tip({ severity }: Props) {
	return severity ? (
		<div className={styles.tip_wrapper}>
			{severity === "severe_high" && (
				<h4>
					Extremely Hot! Avoid going outdoors to prevent heat stroke or other kinds of
					health issues!
				</h4>
			)}
			{severity === "high" && <h4>Too Hot! Try to stay indoors and drink lots of water.</h4>}
			{severity === "moderate" && (
				<h4>
					Moderate Temparature! Drink lots of water and avoid staying outdoors for
					prolonged period of time.
				</h4>
			)}
			{severity === "normal" && <h4>It's a pleasant weather outside. Go and enjoy it.</h4>}
			{severity === "low" && <h4>Getting Cold Chief! Have some hot coffee!</h4>}
			{severity === "severe_low" && (
				<h4>
					Extremely Cold! Avoid going outdoors as much as you can. Stay indoors and keep
					yourself warm!
				</h4>
			)}
		</div>
	) : (
		<div />
	);
}
