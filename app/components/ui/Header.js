"use client";
import Link from "next/link";
import { useState } from "react";
import classes from "./Header.module.css";
import { usePathname, useRouter } from "next/navigation";

export let isApproved = false;

const Header = () => {
	const router = useRouter();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const ans = process.env.NEXT_PUBLIC_ADMIN_KEY;

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const accessAdmin = () => {
		const passcode = prompt("Are you an admin:");
		if (passcode === ans) {
			isApproved = true;
			router.push("/admin/posts");
		} else {
			alert("Access Denied");
			return;
		}
	};
	return (
		<section className={classes.headerWrapper}>
			<div className={`container ${classes.header}`}>
				<div
					className={`
						${isMenuOpen ? `${classes.header} ${classes.open}` : classes.header}
					`}
				>
					<ul>
						<li>
							<Link href="/" className="">
								Home
							</Link>
						</li>
						<li>
							<Link
								href="https://www.linkedin.com/in/golden-dennar-tanimowo/"
								target="_blank"
							>
								Linkedin
							</Link>
						</li>
						<li>
							<Link href="https://twitter.com/mycode_journey" target="_blank">
								Twitter
							</Link>
						</li>
						<li>
							<Link href="/posts" className="">
								Posts
							</Link>
						</li>
						<li onClick={accessAdmin} className={classes.admin}>
							Admin
						</li>
					</ul>
				</div>
				<div onClick={toggleMenu} className={classes.menuIcon}>
					<div className={classes.bar}></div>
					<div className={classes.bar}></div>
					<div className={classes.bar}></div>
				</div>
			</div>
		</section>
	);
};

export default Header;
