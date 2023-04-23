import { useCityInput, useCachedData } from "@/lib/hooks";
import { getCityCoordinates } from "@/lib/getCityCoordinates";
import styles from "@/styles/LandingPageForm.module.css";

export default function LandingPageForm() {
	const [inputProps, resetInputVal] = useCityInput("");
	return (
		<div className={styles.form_wrapper}>
			<div className={styles.heading}>
				<h1>Welcome to Minimalist Weather App</h1>
			</div>
			<form
				className={styles.form}
				onSubmit={async e => {
					e.preventDefault();
					const details = await getCityCoordinates(inputProps.value);
					useCachedData(details);
					resetInputVal();
				}}>
				<div className={styles.input_wrapper}>
					<label htmlFor="location">Location</label>
					<input
						className={styles.input}
						id="location"
						placeholder="City"
						aria-placeholder="Name of your city"
						{...inputProps}
						required
					/>
				</div>
				<div className={styles.btn_wrapper}>
					<button
						className={styles.btn}
						type="submit">
						Continue
					</button>
				</div>
			</form>
		</div>
	);
}
