import { useState, useEffect, useMemo } from "react";
import {
	cachedDataSerializer,
	localTime24HourSerializer,
	localTimeSerializer,
} from "@/lib/serializers";
import Router from "next/router";
import getLocalTime from "./getLocalTime";
import getCurrentWeather from "@/lib/getCurrentWeather";
import getForecast from "./getForecast";
import getAverage from "./getAverage";
import { icons as weatherIcons } from "../lib/weatherIcons";

interface CityDetails {
	city: string;
	country: string;
	lat: string;
	lon: string;
}

interface LocationDetails {
	city: string;
	country: string;
	lat: string;
	lon: string;
	localTime: string;
}

interface ForecastData {
	main: {
		temp: number;
		feels_like: number;
		temp_min: number;
		temp_max: number;
		pressure: number;
		humidity: number;
	};
	weather: [
		{
			main: string;
			description: string;
		},
	];
	dt_txt: string;
	visibility: number;
	wind: {
		speed: number;
		deg: number;
	};
}

interface CurrentWeatherData {
	weather: [{ main: string; description: string }];
	main: {
		temp: number;
		feels_like: number;
		temp_min: number;
		temp_max: number;
		pressure: number;
		humidity: number;
	};
	visibility: number;
	wind: {
		speed: number;
		deg: number;
	};
}

type AnimationHookType = [showDetails: boolean, handleClick: () => void];

export const useCityInput = (initialValue: string): any => {
	const [city, setCity] = useState(initialValue);

	const handleChange = (e: { target: HTMLInputElement }) => {
		const { value } = e.target;
		setCity(value);
	};

	const resetInputVal = () => {
		setCity(initialValue);
	};

	return [{ value: city, onChange: handleChange }, resetInputVal];
};

export function useCachedData(data: object) {
	const _data = localStorage.getItem("city_coordinates");
	if (!_data) {
		localStorage.setItem("city_coordinates", JSON.stringify(data));
		Router.push("/dashboard");
	} else {
		Router.push("/dashboard");
	}
}

export const useLocationDetails = () => {
	const [cityDetails, setCityDetails] = useState<LocationDetails>({
		city: "",
		country: "",
		lat: "",
		lon: "",
		localTime: "",
	});

	useEffect(() => {
		const serialized_data: CityDetails | null = cachedDataSerializer(
			localStorage.getItem("city_coordinates"),
		);
		if (serialized_data) {
			const latLon = {
				lat: serialized_data.lat,
				lon: serialized_data.lon,
			};
			getLocalTime(latLon)
				.then(localtime => {
					setCityDetails({
						city: serialized_data.city,
						country: serialized_data.country,
						lat: serialized_data.lat,
						lon: serialized_data.lon,
						localTime: localtime,
					});
				})
				.catch(err => {
					console.log(err);
				});
		}
	}, []);

	return cityDetails;
};

export const useCurrentWeather = (lat: string, lon: string) => {
	const [currentWeather, setCurrentWeather] = useState<CurrentWeatherData | null>(null);
	useMemo(() => {
		const currentWeather = async () => {
			try {
				const data = await getCurrentWeather(lat, lon);
				console.log(data);
				setCurrentWeather(data);
			} catch (err) {
				console.log(err);
			}
		};
		lat && lon && currentWeather();
	}, [lat, lon]);
	return currentWeather;
};

export const useDayOrNight = (localtime: string) => {
	const time = localTime24HourSerializer(localtime);
	const timeInt = parseInt(time);
	if (timeInt) {
		if (timeInt > 5 && timeInt <= 10) {
			return "day";
		} else if (timeInt > 10 && timeInt <= 18) {
			return "noon";
		} else if (timeInt > 18 && timeInt <= 22) {
			return "night";
		} else {
			return "midnight";
		}
	}
	return "";
};

export const useBackground = () => {
	const [background, setBackground] = useState("");
	const cityDetails = useLocationDetails();
	useEffect(() => {
		const timePeriod = useDayOrNight(cityDetails.localTime);
		if (timePeriod === "day") {
			setBackground("/weather_app_bg/weather_app_sunny.jpg");
		} else if (timePeriod === "noon") {
			setBackground("/weather_app_bg/weather_app_dusk.jpg");
		} else if (timePeriod === "night") {
			setBackground("/weather_app_bg/weather_app_night_bg.jpg");
		} else if (timePeriod === "midnight") {
			setBackground("/weather_app_bg/weather_app_midnight_bg.jpg");
		}
	}, [cityDetails]);
	return background;
};

export const useTempFontColor = () => {
	const [fontColor, setFontColor] = useState("");
	const cityDetails = useLocationDetails();
	useEffect(() => {
		const timePeriod = useDayOrNight(cityDetails.localTime);
		if (timePeriod === "day") {
			setFontColor("linear-gradient(rgba(174, 226, 255, 0.1), #3AB4F2)");
		} else if (timePeriod === "noon") {
			setFontColor("linear-gradient(#F4B183, rgba(223, 120, 87, 0.05))");
		} else if (timePeriod === "night") {
			setFontColor("linear-gradient(#62CDFF, rgb(201, 238, 255))");
		} else {
			setFontColor("linear-gradient(#205295, rgba(255, 255, 255, 0.3))");
		}
	}, [cityDetails]);
	return fontColor;
};

export const useForecast = (lat: string, lon: string) => {
	const [forecast, setForecast] = useState<ForecastData[] | null>(null);
	useMemo(() => {
		const forecast = async () => {
			const list = await getForecast(lat, lon);
			const forecast: ForecastData[] = list.filter((data: any) => {
				const currentDay = new Date().getDate();
				return new Date(data.dt_txt).getDate() === currentDay;
			});
			forecast.length >= 6 ? setForecast(forecast.slice(2, 6)) : setForecast(forecast);
		};
		lat && lon && forecast();
	}, [lat, lon]);
	return forecast;
};

export const useCurrentWeatherIcon = (lat: string, lon: string, localTime: string) => {
	const [weatherIcon, setWeatherIcon] = useState("");
	const currentWeather = useCurrentWeather(lat, lon);
	useMemo(() => {
		const weather = currentWeather?.weather[0].main;
		const timePeriod = useDayOrNight(localTime);
		switch (weather) {
			case "Haze":
				if (timePeriod === "day" || timePeriod === "noon") {
					setWeatherIcon(weatherIcons.haze);
				} else {
					setWeatherIcon(weatherIcons.night_haze);
				}
				break;
			case "Clouds":
				setWeatherIcon(weatherIcons.cloudy);
				break;
			case "Clear":
				setWeatherIcon(weatherIcons.clear);
				break;
			case "Rain":
				setWeatherIcon(weatherIcons.rain);
				break;
			case "Wind":
				setWeatherIcon(weatherIcons.wind);
				break;
			case "Mist":
				setWeatherIcon(weatherIcons.mist);
				break;
			default:
				break;
		}
	}, [currentWeather]);
	return weatherIcon;
};

export const useForecastWeatherIcon = (lat: string, lon: string) => {
	const [forecastIcons, setForecastIcons] = useState<string[]>([""]);
	const forecastList = useForecast(lat, lon);
	useMemo(() => {
		forecastList?.forEach(forecast => {
			const timePeriod = useDayOrNight(forecast.dt_txt);
			switch (forecast.weather[0].main) {
				case "Haze":
					if (timePeriod === "day" || timePeriod === "noon") {
						setForecastIcons(prevState => {
							return [...prevState, weatherIcons.haze];
						});
					} else if (timePeriod === "night") {
						setForecastIcons(prevState => {
							return [...prevState, weatherIcons.night_haze];
						});
					}
					break;
				case "Clouds":
					if (timePeriod === "day" || timePeriod === "noon") {
						setForecastIcons(prevState => {
							return [...prevState, weatherIcons.haze];
						});
					} else if (timePeriod === "night") {
						setForecastIcons(prevState => {
							return [...prevState, weatherIcons.night_haze];
						});
					}
					break;
				case "Clear":
					setForecastIcons(prevState => {
						return [...prevState, weatherIcons.clear];
					});
					break;
				case "Rain":
					setForecastIcons(prevState => {
						return [...prevState, weatherIcons.rain];
					});
					break;
				case "Wind":
					setForecastIcons(prevState => {
						return [...prevState, weatherIcons.wind];
					});
					break;
				case "Mist":
					setForecastIcons(prevState => {
						return [...prevState, weatherIcons.mist];
					});
					break;
				default:
					break;
			}
		});
	}, [forecastList]);

	return forecastIcons;
};

export const useNextDayForecast = (lat: string, lon: string) => {
	const [foreCastList, setForecastList] = useState<ForecastData[]>([]);
	useMemo(() => {
		if (lat && lon) {
			getForecast(lat, lon)
				.then(forecastList => {
					const nextDay = new Date().getDate() + 1;
					const newList: ForecastData[] = forecastList.filter((data: ForecastData) => {
						return new Date(data.dt_txt).getDate() === nextDay;
					});
					setForecastList(newList);
				})
				.catch(err => {
					console.log(err);
				});
		}
	}, [lat, lon]);
	return foreCastList;
};

export const useDiff = (type: string, lat: string, lon: string) => {
	const [diff, setDiff] = useState("");
	const weather = useCurrentWeather(lat, lon);
	const nextDayForecast = useNextDayForecast(lat, lon);
	useEffect(() => {
		if (type === "humidity") {
			const list = nextDayForecast.map(data => {
				return data.main.humidity;
			});
			const average = getAverage(list);
			const diff = weather ? weather.main.humidity - average : 0;
			setDiff(diff.toFixed(2));
		} else if (type === "wind") {
			const list = nextDayForecast.map(data => {
				return data.wind.speed;
			});
			const average = getAverage(list);
			const diff = weather ? weather.wind.speed - average : 0;
			setDiff(diff.toFixed(2));
		} else if (type === "visibility") {
			const list = nextDayForecast.map(data => {
				return data.visibility / 1000; //converting into kms
			});
			const average = getAverage(list);
			const diff = weather ? weather.visibility / 1000 - average : 0;
			setDiff(diff.toFixed(2));
		} else if (type === "pressure") {
			const list = nextDayForecast.map(data => {
				return data.main.pressure;
			});
			const average = getAverage(list);
			const diff = weather ? weather.main.pressure - average : 0;
			setDiff(diff.toFixed(2));
		}
	}, [nextDayForecast, weather, type]);

	return diff;
};

export const useAnimation = (): AnimationHookType => {
	const [showDetails, setShowDetails] = useState(false);

	const handleClick = () => {
		if (!showDetails) {
			setShowDetails(true); //set the state to true only when it is false
		} else {
			setShowDetails(false); //set the state to false only when it is true
		}
	};

	return [showDetails, handleClick];
};

export const useFilterForecastData = (forecastList: ForecastData[]) => {
	//filter the forecast data based on date
	const day1List: ForecastData[] = forecastList.filter((data: ForecastData) => {
		return new Date(data.dt_txt).getDate() === new Date().getDate() + 1;
	});
	const day2List: ForecastData[] = forecastList.filter((data: ForecastData) => {
		return new Date(data.dt_txt).getDate() === new Date().getDate() + 2;
	});
	const day3List: ForecastData[] = forecastList.filter((data: ForecastData) => {
		return new Date(data.dt_txt).getDate() === new Date().getDate() + 3;
	});
	const day4List: ForecastData[] = forecastList.filter((data: ForecastData) => {
		return new Date(data.dt_txt).getDate() === new Date().getDate() + 4;
	});

	//get the list of per day temperatures
	const day1Temps = day1List.map(data => {
		return data.main.temp;
	});
	const day2Temps = day2List.map(data => {
		return data.main.temp;
	});
	const day3Temps = day3List.map(data => {
		return data.main.temp;
	});
	const day4Temps = day4List.map(data => {
		return data.main.temp;
	});

	return [day1Temps, day2Temps, day3Temps, day4Temps];
};

export const useAverageTemp = (lat: string, lon: string) => {
	const [avgTemp, setAvgTemp] = useState<number[]>([]);
	useEffect(() => {
		if (lat && lon) {
			getForecast(lat, lon)
				.then((forecastList: ForecastData[]) => {
					const [day1Temps, day2Temps, day3Temps, day4Temps] =
						useFilterForecastData(forecastList);

					const day1AvgTemp = getAverage(day1Temps);
					const day2AvgTemp = getAverage(day2Temps);
					const day3AvgTemp = getAverage(day3Temps);
					const day4AvgTemp = getAverage(day4Temps);
					setAvgTemp([day1AvgTemp, day2AvgTemp, day3AvgTemp, day4AvgTemp]);
				})
				.catch(err => console.log(err));
		}
	}, [lat, lon]);

	return avgTemp;
};
