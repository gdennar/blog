import classes from "./DetailHeader.module.css";

const DetailHeader = (props) => {
	const { post } = props;

	return (
		<header className={`${classes.header} text-center`}>
			<div className={classes.headerDetails}>
				<h1>{post.title}</h1>
				<small>by {post.author}</small>
			</div>
		</header>
	);
};

export default DetailHeader;
