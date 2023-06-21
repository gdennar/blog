"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { Alert, Checkbox } from "@material-tailwind/react";
import { useEditPost, useAddPost } from "@/app/lib/api-utils";

const initialState = {
	title: "",
	description: "",
	imageUrl: "",
	slug: "",
	date: "",
	author: "",
	isFeatured: false,
	isStarred: false,
};

const AdminForm = () => {
	const { isLoading, addPost } = useAddPost();
	const [message, setMessage] = useState("");
	const { loading, editPost } = useEditPost();

	const searchParams = useSearchParams();
	const params = searchParams.get("slug");

	const router = useRouter();

	const selectPost = useSelector((state) => state.posts.posts);

	const filterPost = selectPost.find((post) => post.slug === params);

	const detectForm = (add, edit) => {
		if (!params) {
			return add;
		}
		return edit;
	};

	const [formData, setFormData] = useState(() => {
		const newState = detectForm({ ...initialState }, filterPost);
		return newState;
	});

	const handleChange = (event) => {
		const { name, value, type, checked } = event.target;
		const newValue = type === "checkbox" ? checked : value;
		setFormData({ ...formData, [name]: newValue });
	};

	const handleAddPost = async (e) => {
		e.preventDefault();
		try {
			await addPost(formData, router);
			setFormData(initialState);
		} catch (error) {
			setMessage(error.message);
		}
	};

	const handleEditPost = async (e) => {
		e.preventDefault();

		try {
			await editPost(formData, params, router);
			setFormData(initialState);
		} catch (error) {
			setMessage(error);
		}
	};

	return (
		<div className="container mt-10">
			<div className="flex justify-between ">
				<h1 className="font-semibold text-2xl">Add Post</h1>
				<Link href="admin/posts" className="p-2 bg-background text-white">
					View All Posts
				</Link>
			</div>
			{message ? (
				<Alert color="red" variant="gradient">
					{message}
				</Alert>
			) : (
				""
			)}
			<form
				className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
				onSubmit={detectForm(handleAddPost, handleEditPost)}
			>
				<div className="mb-4">
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="title"
						type="text"
						name="title"
						placeholder="Title"
						value={formData.title}
						onChange={handleChange}
					/>
				</div>
				<div className="mb-4">
					<textarea
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize rounded-md"
						id="description"
						type="text"
						rows="4"
						cols="50"
						name="description"
						placeholder="Description"
						value={formData.description}
						onChange={handleChange}
					/>
				</div>
				<div className="mb-4">
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="image"
						type="text"
						name="imageUrl"
						placeholder="Image url"
						value={formData.imageUrl}
						onChange={handleChange}
					/>
				</div>

				<div className="mb-4">
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="slug"
						type="text"
						name="slug"
						placeholder="Slug"
						value={formData.slug}
						onChange={handleChange}
					/>
				</div>

				<div className="flex flex-wrap -mx-3 mb-6">
					<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
						<input
							className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
							id="grid-first-name"
							type="date"
							placeholder="Date"
							name="date"
							value={formData.date}
							onChange={handleChange}
						/>
					</div>
					<div className="w-full md:w-1/2 px-3">
						<input
							className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							id="grid-last-name"
							type="text"
							placeholder="Author"
							name="author"
							value={formData.author}
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className="flex flex-wrap -mx-3 mb-6">
					<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
						<Checkbox
							type="checkbox"
							label="Featured Post"
							name="isFeatured"
							checked={formData.isFeatured}
							onChange={handleChange}
						/>
					</div>
					<div className="w-full md:w-1/2 px-3">
						<Checkbox
							type="checkbox"
							label="Starred Post"
							name="isStarred"
							checked={formData.isStarred}
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className="flex items-center justify-between">
					{/* <button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						type="submit"
						disabled={isLoading}
					>
						{isLoading ? "Posting..." : "Post"}
					</button> */}
					{detectForm(
						<button
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							type="submit"
							disabled={isLoading}
						>
							{isLoading ? "Posting..." : "Post"}
						</button>,
						<button
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							type="submit"
							disabled={loading}
						>
							{loading ? "Updating..." : "Update"}
						</button>
					)}
				</div>
			</form>
		</div>
	);
};

export default AdminForm;
