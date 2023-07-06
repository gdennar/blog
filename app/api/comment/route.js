import { createComments, getAllComments } from "@/app/lib/mongo/comments";
import { NextResponse } from "next/server";

export async function GET(request) {
	const { searchParams } = new URL(request.url);
	const slug = searchParams.get("slug");

	try {
		const { comments, error } = await getAllComments();
		if (error) throw new Error(error);

		if (!comments) {
			return NextResponse.json("No comment found");
		}

		const filteredComment = comments.filter((comment) => comment.slug === slug);

		return NextResponse.json({ comments: filteredComment }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

export async function POST(request) {
	const { name, comment, slug, timeStamp } = await request.json();

	try {
		const newComment = {
			name,
			comment,
			slug,
			timeStamp,
		};

		const { message, error } = await createComments(newComment);
		newComment._id = message.insertedId;
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
