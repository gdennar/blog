export async function getData() {
	const url = process.env.NEXT_PUBLIC_URL;

	const response = await fetch(`${url}/api/admin`, {
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
