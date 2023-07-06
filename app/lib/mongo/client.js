import { MongoClient } from "mongodb";

const URI = process.env.MONGO_URL_KEY;

const options = {};
let client = new MongoClient(URI, options);
let clientPromise;

if (process.env.NODE_ENV !== "production") {
	if (!global._mongoClientPromise) {
		global._mongoClientPromise = client.connect();
	}
	clientPromise = global._mongoClientPromise;
} else {
	clientPromise = client.connect();
}

export default clientPromise;
