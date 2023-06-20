"use client";

import classes from "./CommentList.module.css";
import { useSelector } from "react-redux";

const CommentList = ({ slug }) => {
	const filteredComment = useSelector((state) => state.posts.comments);

	return (
		<>
			<h1 className={classes.title}>Comments</h1>
			<ul className="mt-5 mb-5">
				{filteredComment && filteredComment.length > 0 ? (
					filteredComment.map((comment) => {
						const newDate = new Date(comment.timeStamp);
						const formattedDate = newDate.toLocaleDateString("en-US", {
							day: "numeric",
							month: "short",
							year: "numeric",
						});
						console.log(typeof comment);

						return (
							<li key={comment._id}>
								<div className={classes.listInfo}>
									<p>{comment.comment}</p>
									<div className={classes.info}>
										<small>{comment.name}</small>
										<time>
											<small>{formattedDate}</small>
										</time>
									</div>
								</div>
								<div className={classes.line}></div>
							</li>
						);
					})
				) : (
					<p>No comments found.</p>
				)}
			</ul>
		</>
	);
};

export default CommentList;
