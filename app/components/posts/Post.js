import Image from "next/image";
import Link from "next/link";
import classes from "./Post.module.css";

const Post = ({ _id, title, description, slug, imageUrl, date }) => {
	const linkPath = `/posts/${slug}`;

	const newDate = new Date(date).toLocaleDateString("en-US", {
		day: "numeric",
		month: "short",
		year: "numeric",
	});

	return (
		<>
			<li className={`${classes.post} text-center pt-7`}>
				<div className={classes.postSection}>
					<Link href={linkPath}>
						<div className={classes.postImage}>
							<Image src={imageUrl} alt="blogImage" width={450} height={500} />
						</div>
						<div className={classes.postDetails}>
							<h3>{title}</h3>
							<time>
								{newDate} - {`6 Comments`}
							</time>
							<p className="pt-3 ">
								{description.substring(0, 200).concat("...")}
							</p>
						</div>
					</Link>
					<div className="pt-7 mb-10">
						<Link href={linkPath} className={`${classes.btnShort}`}>
							Read More
						</Link>
					</div>
				</div>

				<hr />
			</li>
		</>
	);
};

export default Post;
