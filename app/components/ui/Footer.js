import Link from "next/link";
import classes from "./Footer.module.css";
const Footer = () => {
	return (
		<div className={`${classes.footerNav} `}>
			<div>{`${new Date().getFullYear()} © Golden`}</div>
			<div>
				<Link href="#">Contact us</Link>
			</div>
		</div>
	);
};

export default Footer;
