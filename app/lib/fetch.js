"use client";
export async function getData() {
	const url = process.env.NEXT_PUBLIC_URL;

	const response = await fetch(`/api/admin`, {
		next: {
			revalidate: 120,
		},
		// cache: "no-cache",
		credentials: "same-origin",
	});
	const result = await response.json();
	const data = result.message;
	return data;
}
// "use client";
// import useSWR from "swr";

// const fetcher = async (url) => {
// 	const response = await fetch(url);
// 	const data = await response.json();
// 	return data;
// };

// export const useData = (url) => {
// 	const { data, error } = useSWR(url, fetcher);
// 	console.log(data);
// 	return {
// 		posts: data,
// 		error,
// 		isLoading: !data && !error,
// 	};
// };
