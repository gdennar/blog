"use client";
import { useState } from "react";
import classes from "./CommentForm.module.css";
import { Card, Input, Button, Alert } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { postAction } from "@/app/store/postSlice";

const CommentForm = ({ postComment, slug }) => {
	const currentTimestamp = new Date().toLocaleDateString();
	const [name, setName] = useState("");
	const [comment, setComment] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState("");
	const [timeStamp, setTimestamp] = useState(currentTimestamp);
	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		const comments = {
			name,
			comment,
			slug,
			timeStamp,
		};

		try {
			const response = await fetch(`http://127.0.0.1:3000/api/comments`, {
				method: "POST",
				body: JSON.stringify(comments),
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await response.json();
			console.log(data);

			if (response.ok) {
				dispatch(
					postAction.storeComments({
						comments,
					})
				);
				setIsLoading(false);
				setComment("");
				setName("");
			} else {
				setIsLoading(false);
				setMessage("An error occurred");
			}
		} catch (error) {
			setIsLoading(false);
			setMessage("An error occurred:", error);
		}

		postComment();
	};

	return (
		<section className="">
			{" "}
			<Card color="transparent">
				<form
					onSubmit={handleSubmit}
					className={`mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 ${classes.form}`}
				>
					<div className="mb-4 flex flex-col gap-6 ">
						<Input
							type="text"
							size="lg"
							label="Name"
							name="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
						<Input
							type="text"
							size="lg"
							label="Comment"
							required
							name="comment"
							value={comment}
							onChange={(e) => setComment(e.target.value)}
						/>
						<input
							type="hidden"
							name="timestamp"
							value={timeStamp}
							id="timestamp"
						/>
					</div>

					<Button type="submit" className="mt-6 bg-nav" fullWidth>
						{isLoading ? "Posting comment..." : "Post Comment"}
					</Button>
					{message ? <Alert>{message}</Alert> : ""}
				</form>
			</Card>
		</section>
	);
};

export default CommentForm;
