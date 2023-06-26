import {
	connectDatabase,
	getComments,
	insertDocument,
	getDocuments,
} from "@/app/lib/db-utils";

import { NextResponse } from "next/server";

export const corsHeaders = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS(request) {
	return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(request) {
	const { searchParams } = new URL(request.url);
	const slug = searchParams.get("slug");
	let client;

	try {
		client = await connectDatabase();
		const result = await getDocuments(client, "posts", "comments");

		if (!result) {
			return NextResponse.json("No comment found");
		}
		const filteredComment = result.filter((comment) => comment.slug === slug);

		return NextResponse.json(
			{ comments: filteredComment },
			{ headers: corsHeaders }
		);
	} catch (error) {
		return NextResponse.json({ message: "Error getting posts", status: 500 });
	} finally {
		await client.close();
	}
}

export async function POST(request) {
	const { name, comment, slug, timeStamp } = await request.json();
	let client;

	try {
		client = await connectDatabase();

		const newComment = {
			name,
			comment,
			slug,
			timeStamp,
		};

		let result;

		result = await insertDocument(client, "posts", "comments", newComment);
		newComment._id = result.insertedId;

		return NextResponse.json(
			{ comments: newComment, status: 201 },
			{ headers: corsHeaders }
		);
	} catch (error) {
		return NextResponse.json({ message: error.message, status: 500 });
	} finally {
		await client.close();
	}
}
