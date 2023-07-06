"use client";
import { useState } from "react";
import PostItem from "./PostItem";
import { useSelector } from "react-redux";

import { useFetchCollection } from "../../lib/api-utils";
import Link from "next/link";
import { Alert } from "@material-tailwind/react";

const AdminList = () => {
	const [message, setMessage] = useState("");
	//const { data, isLoading } = useFetchCollection();
	const url = process.env.NEXT_PUBLIC_URL;

	//const posts = useSelector((state) => state.posts.posts);

	const handleDelete = async (slug) => {
		try {
			const response = await fetch(`${url}/api/posts/?slug=${slug}`, {
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
					{/* {isLoading ? (
						<tr key="loader">
							<td className="text-center table-row p-10" colSpan="6">
								<p className="text-xl">Loading...</p>
							</td>
						</tr>
					) : ( */}
					<PostItem onDelete={handleDelete} />
					{/* )} */}
				</tbody>
			</table>
		</div>
	);
};

export default AdminList;
