"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { Checkbox } from "@material-tailwind/react";

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
	const [isLoading, setIsLoading] = useState(false);
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

	const addPost = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		const response = await fetch("/api/admin", {
			method: "POST",
			body: JSON.stringify(formData),
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (response.ok) {
			router.push("/admin/posts");
			setIsLoading(false);
			setFormData(initialState);
		} else {
			setIsLoading(false);
			setFormData(initialState);
		}
	};

	const editPost = async (e) => {
		e.preventDefault();
		let updatedPost = {
			title: formData.title,
			description: formData.description,
			imageUrl: formData.imageUrl,
			slug: formData.slug,
			date: formData.date,
			author: formData.author,
			isFeatured: formData.isFeatured,
			isStarred: formData.isStarred,
		};
		const response = await fetch(`/api/admin?slug=${params}`, {
			method: "PUT",
			body: JSON.stringify(updatedPost),
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (response.ok) {
			console.log("Form submitted");
			setFormData(initialState);
			router.push("/admin/posts");
		} else {
			console.log("Error submitting");
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

			<form
				className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
				onSubmit={detectForm(addPost, editPost)}
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
							disabled={isLoading}
						>
							{isLoading ? "Updating..." : "Update"}
						</button>
					)}
				</div>
			</form>
		</div>
	);
};

export default AdminForm;
