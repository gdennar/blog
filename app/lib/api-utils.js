"use client";
import { useEffect, useState } from "react";

export const useFetchCollection = () => {
	const [data, setData] = useState([]);
	const [isLoading, setisLoading] = useState(false);

	const getData = async () => {
		setisLoading(true);
		const response = await fetch("http://localhost:3000/api/admin");
		const data = await response.json();
		setData(data.message);
		setisLoading(false);
	};

	useEffect(() => {
		getData();
	}, []);

	return { data, isLoading };
};

// export const useCommentCollection = (slug) => {
// 	const [data, setData] = useState([]);
// 	const [isLoading, setisLoading] = useState(false);
// 	setisLoading(true);
// 	const getData = async () => {
// 		const response = await fetch(`http://localhost:3000/api/comments/${slug}`);
// 		const data = await response.json();
// 		setData(data.message);
// 		setisLoading(false);
// 	};

// 	getData();

// 	return { data, isLoading };
// };
