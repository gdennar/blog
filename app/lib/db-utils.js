import { MongoClient } from "mongodb";

const url = process.env.MONGO_URL_KEY;

export const connectDatabase = async () => {
	let client;

	try {
		if (!client) {
			client = await MongoClient.connect(url);
		}
		return client;
	} catch (error) {
		console.error("Failed to connect to the database:", error);
		throw new Error("Failed to connect to the database");
	}
};

export const insertDocument = async (client, dbs, collection, document) => {
	const db = client.db(dbs);
	const result = await db.collection(collection).insertOne(document);
	return result;
};

export const getDocuments = async (client, dbs, collection) => {
	const db = client.db(dbs);
	const collections = await db.collection(collection);
	const documents = await collections.find().toArray();
	return documents;
};

export const deleteDocument = async (client, dbs, collection, slug) => {
	const db = client.db(dbs);
	const deleteResult = await db
		.collection(collection)
		.deleteOne({ slug: slug });
	return deleteResult;
};

export const updateDocument = async (
	client,
	dbs,
	collection,
	slug,
	document
) => {
	const db = client.db(dbs);
	const updateResult = await db
		.collection(collection)
		.updateOne({ slug: slug }, { $set: document });
	return updateResult;
};

export const getComments = async (
	client,
	dbs,
	collection,
	sort,
	filter = {}
) => {
	const db = client.db(dbs);
	const documents = await db
		.collection(collection)
		.find(filter)
		.sort(sort)
		.toArray();

	return documents;
};
