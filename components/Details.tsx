import styles from "@/styles/Details.module.css";
import { useState, useEffect } from "react";
import ForecastToday from "./ForecastToday";
import SafetyTip from "./SafetyTip";
import Overview from "./Overview";

interface Props {
	lat: string;
	lon: string;
}

export default function Details(props: Props) {
	const [showDetails, setShowDetails] = useState(false);
	const [animationStarted, setAnimationStarted] = useState(false);
	const [screenHeight, setScreenHeight] = useState(0);

	//handle when clicked on details div
	const handleClick = () => {
		if (!showDetails) {
			setShowDetails(true); //set the state to true only when it is false
			setAnimationStarted(true);
		} else {
			setShowDetails(false); //set the state to false only when it is true
			setTimeout(() => {
				setAnimationStarted(false);
			}, 400); //setting the animation started state to false 0.5s after the drop down animation is over
		}
	};

	useEffect(() => {
		const screenHeight = window.innerHeight;
		setScreenHeight(screenHeight);
		return () => {
			setScreenHeight(0);
		};
	}, [showDetails]);

	return (
		<section
			onClick={handleClick}
			className={styles.details}
			style={{
				transform: showDetails
					? "translateY(0)"
					: screenHeight >= 800
					? "translateY(75%)"
					: "translateY(68%)",
				zIndex: animationStarted ? 20 : 0,
			}}>
			<hr className={styles.hr} />
			<div className={styles.heading}>
				<h3 style={{ textAlign: "center" }}>Today's Forecast</h3>
			</div>
			<ForecastToday {...props} />
			<div className={styles.extra_details}>
				<SafetyTip {...props} />
				<Overview {...props} />
			</div>
		</section>
	);
}
