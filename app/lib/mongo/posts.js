import clientPromise from "./client";
let client;
let db;
let post;

async function init() {
	if (db) return;
	try {
		client = await clientPromise;
		db = await client.db("posts");
		post = await db.collection("post");
	} catch (error) {
		throw new Error("Failed to connect to the database.");
	}
}

(async () => {
	await init();
})();

export async function getAllPosts() {
	try {
		if (!post) await init();

		const result = await post.find().toArray();
		return { posts: result };
	} catch (error) {
		return { error: "Failed to fetch posts!" };
	}
}

export async function createPost(document) {
	try {
		if (!post) await init();

		const result = await post.insertOne(document);
		return { message: result };
	} catch (error) {
		return { error: "Failed to create posts!" };
	}
}

export async function deletePost(slug) {
	try {
		if (!post) await init();

		const result = await post.deleteOne({ slug: slug });
		return { message: result };
	} catch (error) {
		return { error: "Failed to delete post!" };
	}
}

export async function updatePost(slug, document) {
	try {
		if (!post) await init();

		const result = await post.updateOne({ slug: slug }, { $set: document });
		return { message: result };
	} catch (error) {
		return { error: "Failed to delete post!" };
	}
}

export async function getPostBySlug(slug) {
	try {
		if (!post) await init();

		const result = await post.findOne({ slug: slug });
		if (!result) throw new Error();
		return { posts: { ...result, slug: result.slug } };
	} catch (error) {
		return { error: "Failed to get comment!" };
	}
}
