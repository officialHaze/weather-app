export default function getAverage(values: number[]) {
	let sum = 0;
	values.forEach(value => {
		sum = sum + value;
	});
	const average = sum / values.length;
	return average;
}
