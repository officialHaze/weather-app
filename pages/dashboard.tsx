import isDataCached from "@/lib/isDataCached";
import Router from "next/router";
import { useEffect } from "react";
import CurrentWeatherDetails from "@/components/CurrentWeatherDetails";
import { useLocationDetails, useBackground } from "@/lib/hooks";
import Head from "next/head";
import Footer from "@/components/Footer";
import { Quicksand } from "next/font/google";
import styles from "@/styles/Dashboard.module.css";

const quicksand = Quicksand({ weight: ["400", "600", "700"], subsets: ["latin"] });

export default function dashboard() {
	useEffect(() => {
		!isDataCached() && Router.push("/");
	}, []);

	const cityDetails = useLocationDetails();

	const background = useBackground();

	return (
		<>
			<Head>
				<title>Minimalist Weather App</title>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link
					rel="icon"
					href="/weather-app-icon.png"
				/>
				<meta
					name="description"
					content="Minimalist Weather App created by Moinak Dey"
				/>
			</Head>
			<main
				className={`${styles.main} ${quicksand.className}`}
				style={{
					backgroundImage: `url(${background ? background : ""})`,
				}}>
				<CurrentWeatherDetails {...cityDetails} />
				<Footer />
			</main>
		</>
	);
}
