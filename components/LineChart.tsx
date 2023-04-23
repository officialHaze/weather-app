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
	Filler,
	ChartDataset,
	ScriptableContext,
} from "chart.js";
import { Line } from "react-chartjs-2";
import styles from "@/styles/LineChart.module.css";

ChartJS.register(
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	CategoryScale,
	Filler,
);

interface Props {
	lat: string;
	lon: string;
}

interface ChartData {
	labels: string[];
	datasets: ChartDataset<"line", number[]>[] &
		{
			data: number[];
			backgroundColor: Function;
			borderColor: string;
			borderWidth: number;
			pointBackgroundColor: string;
			label: string;
			fill: boolean;
		}[];
}

export default function LineChart({ lat, lon }: Props) {
	const [chartData, setChartData] = useState<ChartData | null>(null);
	const avgTemps = useAverageTemp(lat, lon);

	useMemo(() => {
		setChartData({
			labels: ["Tomorrow", "Day 3", "Day 4", "Day 5"],
			datasets: [
				{
					data: avgTemps,
					fill: true,
					backgroundColor: (ctx: ScriptableContext<"line">) => {
						const context = ctx.chart.ctx;
						const gradient = context.createLinearGradient(0, 0, 0, 200);
						gradient.addColorStop(0, "rgba(250,174,50,1)");
						gradient.addColorStop(1, "rgba(250,174,50,0)");
						return gradient;
					},
					borderColor: "orange",
					borderWidth: 1,
					label: "Average Temperature",
					pointBackgroundColor: "white",
				},
			],
		});
	}, [avgTemps]); //set chart data

	return (
		<div className={styles.line_chart_container}>
			<h1>Average Temperature per day</h1>
			<div className={styles.line_chart_wrapper}>
				{chartData && (
					<Line
						data={chartData}
						options={{
							responsive: true,
							scales: {
								y: {
									ticks: {
										callback: value => {
											return value + "°";
										},
										stepSize: 2,
									},
								},
							},
						}}
					/>
				)}
			</div>
		</div>
	);
}
