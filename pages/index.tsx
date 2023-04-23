import styles from "@/styles/Home.module.css";
import Head from "next/head";
import { useLayoutEffect } from "react";
import Router from "next/router";
import LandingPageForm from "@/components/LandingPageForm";
import isDataCached from "@/lib/isDataCached";
import Footer from "@/components/Footer";

export default function Home() {
	//if there is cached data in regards to city details, redirect to dashboard
	useLayoutEffect(() => {
		isDataCached() ? Router.push("/dashboard") : localStorage.removeItem("city_coordinates");
	}, []);
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
			</Head>
			<main className={styles.main}>
				<LandingPageForm />
				<Footer />
			</main>
		</>
	);
}
