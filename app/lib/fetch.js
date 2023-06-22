export async function getData() {
	const response = await fetch("http://127.0.0.1:3000/api/admin", {
		next: {
			revalidate: 120,
		},
	});
	const result = await response.json();
	const data = result.message;
	return data;
}
