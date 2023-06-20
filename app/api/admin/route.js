import {
	connectDatabase,
	getDocuments,
	insertDocument,
	deleteDocument,
	updateDocument,
} from "@/app/lib/db-utils";
import { NextResponse } from "next/server";

export async function GET(request) {
	let client;

	try {
		client = await connectDatabase();
		const result = await getDocuments(client, "posts", "post");
		if (!result) {
			return NextResponse.json("No post found");
		}
		return NextResponse.json({ message: result });
	} catch (error) {
		return NextResponse.json({ message: "Error getting posts", status: 500 });
	}
	// finally {
	// 	await client.close();
	// }
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
	let client;

	try {
		client = await connectDatabase();
		if (description.length === 0 || slug.length === 0) {
			client.close();
			return NextResponse.json({
				message: "Please check data before submitting!",
				status: 400,
			});
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

		result = await insertDocument(client, "posts", "post", newPost);
		return NextResponse.json({ message: newPost, status: 201 });
	} catch (error) {
		return NextResponse.json({ message: "Inserting post failed", status: 500 });
	} finally {
		await client.close();
	}
}

export async function DELETE(request) {
	const { searchParams } = new URL(request.url);
	const slug = searchParams.get("slug");
	let client;
	let result;

	try {
		client = await connectDatabase();
		result = await deleteDocument(client, "posts", "post", slug);

		return NextResponse.json({
			message: "Deleted Post Successfully",
		});
	} catch (error) {
		return NextResponse.json({
			message: "Delete post failed",
			status: 500,
		});
	} finally {
		await client.close();
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

	let client;

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
		client = await connectDatabase();
		result = await updateDocument(client, "posts", "post", slugId, updatedPost);

		return NextResponse.json({ message: updatedPost, status: 201 });
	} catch (error) {
		return NextResponse.json({ message: "Updating post failed", status: 500 });
	} finally {
		await client.close();
	}
}
