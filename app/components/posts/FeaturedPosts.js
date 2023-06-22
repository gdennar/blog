import classes from "./FeaturedPosts.module.css";
import Image from "next/image";
import Link from "next/link";

const FeaturedPosts = ({ data }) => {
	const featuredPosts = data.filter((post) => post.isFeatured === true);
	return (
		<div className={`container mt-10 mb-10 ${classes.feature}`}>
			<ul
				className={`${classes.featuredItem} container grid gap-x-4 grid-flow-col justify-center h-36 `}
			>
				<li className="shadow-md">Featured Posts</li>
				{featuredPosts.map((post) => (
					<li key={post._id} className={`${classes.featuredPost} shadow-lg`}>
						<Link href={`/posts/${post.slug}`}>
							<div className={classes.postImage}>
								<Image
									src={post.imageUrl}
									alt="blogImage"
									width={100}
									height={100}
									className={classes.featuredImg}
								/>
							</div>
							<div className={classes.title}>{post.title} &rarr;</div>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default FeaturedPosts;
