const { NextResponse } = require("next/server");
import {
	getAllPosts,
	createPost,
	deletePost,
	updatePost,
} from "@/app/lib/mongo/posts";

export async function GET(request) {
	try {
		const { posts, error } = await getAllPosts();
		if (error) throw new Error(error);

		if (!posts) {
			return NextResponse.json("No post found");
		}

		return NextResponse.json({ posts }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

export async function POST(request) {
	const {
		title,
		date,
		description,
		slug,
		imageUrl,
		author,
		isFeatured,
		isStarred,
	} = await request.json();

	try {
		if (description.length === 0 || slug.length === 0) {
			return NextResponse.json(
				{
					message: "Please check data before submitting!",
				},
				{ status: 400 }
			);
		}
		const newPost = {
			title,
			description,
			date,
			slug,
			imageUrl,
			author,
			isFeatured,
			isStarred,
		};

		const { message, error } = await createPost(newPost);
		if (error) throw new Error(error);

		return NextResponse.json({ message }, { status: 201 });
	} catch (error) {
		return NextResponse.json(
			{
				message: error.message,
			},
			{ status: 500 }
		);
	}
}

export async function DELETE(request) {
	const { searchParams } = new URL(request.url);
	const slug = searchParams.get("slug");

	let result;

	try {
		result = await deletePost(slug);

		return NextResponse.json({
			message: "Deleted Post Successfully",
		});
	} catch (error) {
		return NextResponse.json(
			{
				message: error.message,
			},
			{ status: 500 }
		);
	}
}

export async function PUT(request) {
	const { searchParams } = new URL(request.url);
	const slugId = searchParams.get("slug");
	const {
		title,
		date,
		description,
		slug,
		imageUrl,
		author,
		isFeatured,
		isStarred,
	} = await request.json();

	const updatedPost = {
		title,
		date,
		description,
		slug,
		imageUrl,
		author,
		isFeatured,
		isStarred,
	};

	try {
		const { message, error } = await updatePost(slugId, updatedPost);

		if (error) throw new Error(error);

		return NextResponse.json({ message, status: 200 });
	} catch (error) {
		return NextResponse.json({ message: error.message, status: 500 });
	}
}
