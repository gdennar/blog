export async function getData() {
	const response = await fetch("http://localhost:3000/api/admin", {
		next: {
			revalidate: 120,
		},
	});
	const result = await response.json();
	const data = result.message;
	return data;
}

// export async function getComments(slug) {
// 	const response = await fetch(
// 		`http://localhost:3000/api/comments/?slug=${slug}`
// 	);
// 	const result = await response.json();
// 	const data = result.comments;
// 	return data;
// }
