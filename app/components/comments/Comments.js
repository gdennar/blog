"use client";
import { Button } from "@material-tailwind/react";
import classes from "./Comments.module.css";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { postAction } from "@/app/store/postSlice";

const Comments = (props) => {
	const { slug } = props;
	const dispatch = useDispatch();
	const url = process.env.NEXT_PUBLIC_URL;

	const [showComments, setShowComments] = useState(false);
	const [showForm, setShowForm] = useState(false);

	useEffect(() => {
		let subscribed = true;
		const getData = async () => {
			const response = await fetch(`${url}/api/comment/?slug=${slug}`);
			const result = await response.json();
			const comments = result.comments;
			if (subscribed) {
				dispatch(
					postAction.storeComments({
						comments,
					})
				);
			}
		};
		getData();

		return () => {
			subscribed = false;
		};
	}, [dispatch, slug, url]);

	const showCommentHandler = (event) => {
		event.preventDefault();
		setShowComments(!showComments);
	};

	const showFormHandler = (event) => {
		event.preventDefault();
		setShowForm(!showForm);
	};

	const postComment = () => {
		setShowForm(!showForm);
	};

	return (
		<section className={`container ${classes.comments}`}>
			{!showComments ? (
				<Button
					type="button"
					onClick={showCommentHandler}
					variant="outlined"
					className={classes.btn}
				>
					See Comments
				</Button>
			) : (
				""
			)}
			{showComments ? <CommentList slug={slug} /> : ""}
			{showComments && !showForm ? (
				<div className="flex justify-end">
					<Button onClick={showFormHandler} type="button">
						Add Comment
					</Button>
				</div>
			) : (
				""
			)}
			{showForm ? <CommentForm postComment={postComment} slug={slug} /> : ""}
		</section>
	);
};

export default Comments;
