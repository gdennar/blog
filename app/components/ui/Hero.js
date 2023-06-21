"use client";
import Image from "next/image";
import profileImg from "../../../public/images/site/goldenImg.png";
import avatarImg from "../../../public/images/site/profile-pic.png";
import classes from "./Hero.module.css";

const Hero = ({ data }) => {
	const isStarred = data.filter((post) => post.isStarred === true);

	return (
		<section className={`w-screen ${classes.hero}`}>
			<div className={classes.innerText}>BLOG</div>
			<div className={` ${classes.heroContent}`}>
				<div>
					<p className={classes.heroTitle}>Golden</p>
				</div>
				<div className={classes.heroDetails}>
					<div className={classes.heroText}>
						<Image
							className="inline object-cover w-10 h-10 rounded-full"
							src={avatarImg}
							alt="My Profile image"
						/>
						<br />
						{isStarred.map((post) => {
							const { title, description, date, slug } = post;

							const newDate = new Date(date);

							const formattedDate = newDate.toLocaleDateString("en-US", {
								day: "numeric",
								month: "short",
								year: "numeric",
							});

							return (
								<div key={slug}>
									<small className="text-[.6rem]">
										{formattedDate}{" "}
										<span className={`${classes.heroDot}  text-[#735f32]`}>
											{" "}
											-
										</span>
										<span> Blog</span>
									</small>
									<h1 className="mt-5 text-[1.2rem] font-bold">{title}</h1>
									<p className={`${classes.heroBlog} font-light leading-7`}>
										{description.substring(0, 100).concat("...")}
									</p>
									{/* <div>
										<Link href={`/posts/${slug}`} className={classes.heroLink}>
											Read More
										</Link>
									</div> */}
								</div>
							);
						})}
					</div>
					<div className={classes.heroImg}>
						<Image src={profileImg} height="300px" alt="profileImg" priority />
					</div>
				</div>
			</div>
			<div className={classes.area}>
				<ul className={classes.circles}>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					{/* <li></li>
					<li></li>
					<li></li> */}
				</ul>
			</div>
		</section>
	);
};

export default Hero;
