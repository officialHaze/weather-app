import { BsLinkedin } from "react-icons/bs";
import { ImFacebook2 } from "react-icons/im";
import { SiGmail } from "react-icons/si";
import styles from "@/styles/Footer.module.css";

export default function Footer() {
	return (
		<section className={styles.footer}>
			<div>&copy; Copyright {new Date().getFullYear()}</div>
			<div>
				<p>Made with 💛 by Moinak Dey</p>
			</div>
			<div className={styles.socials_wrapper}>
				<a href="https://www.linkedin.com/in/moinak-dey-60b1a3266/">
					<BsLinkedin />
				</a>
				<a href="https://www.facebook.com/moinak.dey.16/">
					<ImFacebook2 />
				</a>
				<a href="mailto: moinak.dey8@gmail.com">
					<SiGmail />
				</a>
			</div>
		</section>
	);
}
