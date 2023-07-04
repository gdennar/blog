import { poppins } from "./font";
import "./globals.css";
import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";
import { Providers } from "./store/provider";

export const metadata = {
	title: "Blog by Data",
	description: "Blog created by Golden",
	keywords: "web development, blog development, react, nextjs",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={poppins.className}>
				<Header />
				<Providers>
					<main>{children}</main>
				</Providers>
				<Footer />
			</body>
		</html>
	);
}
