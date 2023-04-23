import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<link
					rel="preconnect"
					href="https://fonts.googleapis.com"
				/>
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&family=Poppins:wght@400;800&display=swap"
					rel="stylesheet"
				/>
				<meta
					name="description"
					content="Minimalist Weather App created by Moinak Dey"
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
