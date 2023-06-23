"use client";
import { useEffect, useState } from "react";

const url = process.env.api_url;

export const useFetchCollection = () => {
	const [data, setData] = useState([]);
	const [isLoading, setisLoading] = useState(false);

	const getData = async () => {
		setisLoading(true);
		const response = await fetch(`${url}/api/admin`);
		const data = await response.json();
		setData(data.message);
		setisLoading(false);
	};

	useEffect(() => {
		getData();
	}, []);

	return { data, isLoading };
};

export const useAddPost = () => {
	const [isLoading, setIsLoading] = useState(false);

	const addPost = async (formData, router) => {
		try {
			setIsLoading(true);
			const response = await fetch(`${url}/api/admin`, {
				method: "POST",
				body: JSON.stringify(formData),
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (response.ok) {
				router.push("/admin/posts");
			} else {
				throw new Error("Failed to add post.");
			}
		} catch (error) {
			throw new Error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return { isLoading, addPost };
};

export const useEditPost = () => {
	const [loading, setIsLoading] = useState(false);

	const editPost = async (formData, params, router) => {
		try {
			setIsLoading(true);

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

			const response = await fetch(`${url}/api/admin?slug=${params}`, {
				method: "PUT",
				body: JSON.stringify(updatedPost),
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (response.ok) {
				console.log("Form submitted");
			} else {
				throw new Error("Error submitting");
			}
		} catch (error) {
			throw error;
		} finally {
			router.push("/admin/posts");
			setIsLoading(false);
		}
	};

	return { loading, editPost };
};
