"use client";
import { useEditPost } from "@/app/lib/api-utils";
import { postAction } from "@/app/store/postSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const url = process.env.NEXT_PUBLIC_URL;

const PostItem = (props) => {
	const { onDelete } = props;
	const { loading } = useEditPost();
	const posts = useSelector((state) => state.posts.posts);
	const router = useRouter();
	const dispatch = useDispatch();

	useEffect(() => {
		let subscribed = true;
		const getData = async () => {
			const response = await fetch(`${url}/api/posts`);
			const result = await response.json();
			const post = result.posts;
			if (subscribed) {
				dispatch(
					postAction.storePosts({
						post,
					})
				);
			}
		};
		getData();

		return () => {
			subscribed = false;
		};
	}, [dispatch]);

	const handleEdit = (slug) => {
		router.push(`/admin/form/?slug=${slug}`);
	};

	return (
		<>
			{posts.length > 0 ? (
				posts.map((post, index) => {
					return (
						<tr className="table-row p-10" key={post.slug}>
							<td className="table-cell border px-8 py-4">{index + 1}</td>
							<td className="table-cell border px-8 py-4">{post.title}</td>
							<td className="table-cell border px-8 py-4">
								{post.description.substring(0, 19).concat("...")}
							</td>
							<td className="table-cell border px-8 py-4">{post.slug}</td>
							<td className="border px-8 py-4">
								<button
									className="bg-edit text-white p-2 rounded-md"
									onClick={() => handleEdit(post.slug)}
								>
									{loading ? "Loading..." : "Edit"}
								</button>
							</td>
							<td className="border px-8 py-4">
								<button
									className="bg-delete text-white p-2 rounded-md"
									onClick={() => onDelete(post.slug)}
								>
									Delete
								</button>
							</td>
						</tr>
					);
				})
			) : (
				<tr>
					<td colSpan="6">No posts found</td>
				</tr>
			)}
		</>
	);
};

export default PostItem;
