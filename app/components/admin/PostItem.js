"use client";
import { useEditPost } from "@/app/lib/api-utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const url = process.env.NEXT_PUBLIC_URL;

const PostItem = (props) => {
	const { onDelete } = props;
	const { loading } = useEditPost();
	const [isloading, setIsLoading] = useState(false);
	const [posts, setPosts] = useState(false);
	const router = useRouter();

	const getData = async () => {
		setIsLoading(true);
		try {
			const response = await fetch(`${url}/api/posts`);
			const data = await response.json();

			setPosts(data.posts);

			setIsLoading(false);
		} catch (error) {
			console.log(error.message);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getData();
	}, []);

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
