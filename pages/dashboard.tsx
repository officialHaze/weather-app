import isDataCached from "@/lib/isDataCached";
import Router from "next/router";
import { useEffect } from "react";
import CurrentWeatherDetails from "@/components/CurrentWeatherDetails";
import { useLocationDetails, useBackground } from "@/lib/hooks";
import styles from "@/styles/Dashboard.module.css";

export default function dashboard() {
	useEffect(() => {
		!isDataCached() && Router.push("/");
	}, []);

	const cityDetails = useLocationDetails();

	const background = useBackground();

	return (
		<main
			className={styles.main}
			style={{
				backgroundImage: `url(${background ? background : ""})`,
			}}>
			<CurrentWeatherDetails {...cityDetails} />
		</main>
	);
}
