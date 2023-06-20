"use client";
import { useEffect, useState } from "react";
import PostItem from "./PostItem";
import { useDispatch, useSelector } from "react-redux";
import { postAction } from "@/app/store/postSlice";
import { useFetchCollection } from "../../lib/api-utils";
import Link from "next/link";
import { Alert } from "@material-tailwind/react";
import Loading from "@/app/loading";

const AdminList = () => {
	const [message, setMessage] = useState("");
	const { data, isLoading } = useFetchCollection();
	const posts = useSelector((state) => state.posts.posts);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(
			postAction.storePosts({
				posts: data,
			})
		);
	}, [dispatch, data]);

	const handleDelete = async (slug) => {
		try {
			const response = await fetch(`/api/admin/?slug=${slug}`, {
				method: "DELETE",
			});

			if (response.ok) {
				setMessage("Post Deleted");
			}
		} catch (error) {
			setMessage(error.message);
		}
		setMessage("");
	};

	return (
		<div className="mt-10 container">
			<div className="flex justify-between  m-2">
				<h1 className="text-2xl">Posts</h1>
				<Link href="admin/form" className="p-2 bg-background text-white">
					Add Post
				</Link>
			</div>
			{message ? (
				<Alert color="red" variant="gradient">
					{message}
				</Alert>
			) : (
				""
			)}
			<table className="table w-full table-auto border border-background shadow-lg bg-white border-collapse">
				<thead className="table-header-group bg-background text-white">
					<tr className="table-row p-2">
						<th className="table-cell text-left">s/n</th>
						<th className="table-cell text-left">Title</th>
						<th className="table-cell text-left">Description</th>
						<th className="table-cell text-left">Slug</th>
						<th className="table-cell text-left">Actions</th>
						<th className="table-cell text-left"></th>
					</tr>
				</thead>
				<tbody className="table-row-group">
					{isLoading ? (
						<p className="text-center text-xl">Loading...</p>
					) : (
						<PostItem
							posts={posts}
							onDelete={handleDelete}
							loading={isLoading}
						/>
					)}
				</tbody>
			</table>
		</div>
	);
};

export default AdminList;