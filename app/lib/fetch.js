export async function getData() {
	const url = process.env.api_url;

	const response = await fetch(`${url}/api/admin`, {
		next: {
			revalidate: 120,
		},
	});
	const result = await response.json();
	const data = result.message;
	return data;
}
