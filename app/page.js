import FeaturedPosts from "./components/posts/FeaturedPosts";
import Hero from "./components/ui/Hero";
import PostItem from "./components/posts/PostItem";
import { getAllPosts } from "./lib/mongo/posts";

export const dynamic = "force-dynamic";

async function Home() {
	const { posts } = await getAllPosts();

	const sortedPosts = posts.sort((postA, postB) =>
		postA.date > postB.date ? -1 : 1
	);

	return (
		<>
			<Hero data={posts} />
			{posts.length > 0 ? <FeaturedPosts data={posts} /> : "Loading..."}
			{posts.length > 0 ? (
				<PostItem data={sortedPosts} title="Blog Posts" load="Load all Posts" />
			) : (
				"No post found"
			)}
		</>
	);
}

export default Home;
