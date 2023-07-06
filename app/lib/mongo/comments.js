import clientPromise from "./client";

let client;
let db;
let comments;

async function init() {
	if (db) return;
	try {
		client = await clientPromise;
		db = await client.db("posts");
		comments = await db.collection("comments");
	} catch (error) {
		throw new Error("Failed to connect to the database.");
	}
}

(async () => {
	await init();
})();

export async function getAllComments() {
	try {
		if (!comments) await init();

		const result = await comments.find().toArray();
		return { comments: result };
	} catch (error) {
		return { error: "Failed to fetch comments!" };
	}
}

export async function createComments(document) {
	try {
		if (!comments) await init();

		const result = await comments.insertOne(document);
		return { message: result };
	} catch (error) {
		return { error: "Failed to create comments!" };
	}
}

export async function getCommentBySlug(slug) {
	try {
		if (!comments) await init();

		const comment = await comments.findOne({ slug: slug });
		if (!comment) throw new Error();
		return { comments: { ...comment, slug: comment.slug } };
	} catch (error) {
		return { error: "Failed to get comment!" };
	}
}
