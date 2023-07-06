import Post from "./Post";
import Link from "next/link";
import classes from "./PostItem.module.css";

const PostItem = ({ data, load, title }) => {
	return (
		<div className="container mt-20">
			<h1 className={`${classes.postTitle} mb-10 text-center `}>{title}</h1>
			<ul className="grid md:grid-cols-2 gap-4 sm:grid-cols-1">
				{data.map((post) => (
					<Post key={post._id} {...post} />
				))}
			</ul>
			<div className={`${classes.btnLong} text-center mt-10 mb-20`}>
				<Link href="/posts">{load}</Link>
			</div>
		</div>
	);
};

export default PostItem;
