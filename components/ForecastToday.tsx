import styles from "@/styles/Details.module.css";
import { localTimeSerializer, tempSerializer } from "@/lib/serializers";
import { useForecast, useForecastWeatherIcon } from "@/lib/hooks";

interface Props {
	lat: string;
	lon: string;
}

export default function ForecastToday({ lat, lon }: Props) {
	const forecast = useForecast(lat, lon);
	const foreCastIcons = useForecastWeatherIcon(lat, lon);
	return (
		<div className={styles.forecast_details}>
			{forecast?.map((obj, i: number) => {
				const timePeriod = localTimeSerializer(obj.dt_txt);
				const temp = tempSerializer(obj.main.temp);
				return (
					<div
						className={styles.weather_info_wrapper}
						key={i}>
						<div className={styles.forecast_icon_wrapper}>
							<img
								className={styles.weather_icon}
								src={foreCastIcons[i + 1]}
								alt="weather icon"
							/>
						</div>
						<div>
							<p className={styles.forecast_time}>{timePeriod}</p>
						</div>
						<div>
							<p className={styles.forecast_temp}>{temp}°</p>
						</div>
					</div>
				);
			})}
		</div>
	);
}
