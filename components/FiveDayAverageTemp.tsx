import { useAverageTemp } from "@/lib/hooks";
import { useState, useEffect, useMemo } from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LinearScale, PointElement, LineElement, Title, Tooltip, Legend, CategoryScale);

interface Props {
	lat: string;
	lon: string;
}

export default function FiveDayAverageTemp({ lat, lon }: Props) {
	const [chartData, setChartData] = useState<any>();
	const avgTemps = useAverageTemp(lat, lon);
	console.log(avgTemps);

	useMemo(() => {
		setChartData({
			labels: ["Day 1", "Day 2", "Day 3", "Day 4"],
			datasets: [
				{
					data: avgTemps,
					backgroundColor: "orange",
					borderColor: "orange",
					borderWidth: 2,
				},
			],
		});
	}, [avgTemps]);

	return <div>{chartData && <Line data={chartData} />}</div>;
}
