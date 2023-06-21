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

export const editPost = async (e) => {
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
