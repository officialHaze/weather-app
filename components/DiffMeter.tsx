import styles from "@/styles/Overview.module.css";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";

interface Props {
	diff: string;
}

export default function DiffMeter({ diff }: Props) {
	return (
		<div className={styles.diff_wrapper}>
			<p style={{ color: parseFloat(diff) > 0 ? "green" : "red" }}>
				{parseFloat(diff) > 0 ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
				{diff}
			</p>
		</div>
	);
}
