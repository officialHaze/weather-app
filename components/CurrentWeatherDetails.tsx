import { useMemo, useState, useEffect } from "react";
import { localTimeSerializer, tempSerializer } from "@/lib/serializers";
import {
	useCurrentWeather,
	useBackground,
	useForecast,
	useCurrentWeatherIcon,
	useForecastWeatherIcon,
	useTempFontColor,
} from "@/lib/hooks";
import { MdLocationOn } from "react-icons/md";
import Details from "./Details";
import styles from "@/styles/CurrentWeatherDetails.module.css";

interface Props {
	city: string;
	country: string;
	lat: string;
	lon: string;
	localTime: string;
}

export default function CurrentWeatherDetails(props: Props) {
	const [locationData, setLocationData] = useState<Props | null>(null);
	const [weekDay, setWeekDay] = useState("");
	const [temp, setTemp] = useState({
		temp: "",
		feels_like: "",
	});

	const background = useBackground();
	const currentWeather = useCurrentWeather(props.lat, props.lon);

	const weatherIcon = useCurrentWeatherIcon(props.lat, props.lon, props.localTime);

	const fontColor = useTempFontColor();

	useMemo(() => {
		const serialized_time = localTimeSerializer(props.localTime);
		setLocationData({
			...props,
			localTime: serialized_time,
		});
	}, [props]);

	useMemo(() => {
		const temp = tempSerializer(currentWeather ? currentWeather.main.temp : null);
		const feels_like = tempSerializer(currentWeather ? currentWeather.main.feels_like : null);
		if (temp) {
			setTemp(prevState => {
				return {
					...prevState,
					temp: temp,
				};
			});
		}
		if (feels_like)
			setTemp(prevState => {
				return {
					...prevState,
					feels_like: feels_like,
				};
			});
	}, [currentWeather]);

	useEffect(() => {
		const weekDays = [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday",
		];
		const currentDate = new Date();
		const weekDay = weekDays[currentDate.getDay()];
		setWeekDay(weekDay);
	}, []);

	return (
		<section className={styles.current_weather_section}>
			<div
				className={styles.screen}
				style={{ backgroundImage: `url(${background ? background : ""})` }}>
				<div className={styles.current_weather_details_wrapper}>
					<div>
						<h2
							style={{ display: "flex", alignItems: "center" }}
							className={styles.city}>
							<MdLocationOn />
							{locationData?.city},{locationData?.country}
						</h2>
					</div>
					<div>
						<h4 className={styles.weekday}>
							{weekDay}, {locationData?.localTime}
						</h4>
					</div>
					<div className={styles.current_weather_wrapper}>
						<div className={styles.current_temp_wrapper}>
							<div>
								<h1
									className={styles.current_temp}
									style={{
										backgroundImage: `${fontColor}, url(${background})`,
									}}>
									{temp.temp}°
								</h1>
							</div>
							<div className={styles.temp_feels_like_wrapper}>
								<h5>Feels Like: {temp.feels_like}°</h5>
							</div>
							<div className={styles.temp_minmax}>
								<div>
									<p>
										Min:{" "}
										{currentWeather
											? tempSerializer(currentWeather.main.temp_min)
											: ""}
										°
									</p>
								</div>
								<div>
									<p>
										Max:{" "}
										{currentWeather
											? tempSerializer(currentWeather.main.temp_max)
											: ""}
										°
									</p>
								</div>
							</div>
						</div>
						<div>
							<div className={styles.weather_icon_wrapper}>
								<img
									className={styles.weather_icon}
									src={weatherIcon}
									alt="weather icon"
								/>
							</div>
							<div>
								<h1 className={styles.weather_description}>
									{currentWeather?.weather[0].main}
								</h1>
							</div>
						</div>
					</div>
				</div>
				<Details
					lat={props.lat}
					lon={props.lon}
				/>

				<div
					className={styles.border_radius_down}
					style={{ backgroundImage: `url(${background})` }}
				/>
			</div>
		</section>
	);
}
