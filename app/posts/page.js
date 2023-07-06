import PostItem from "../components/posts/PostItem";
import { getAllPosts } from "../lib/mongo/posts";

export const dynamic = "force-dynamic";

async function AllPostPage() {
	const { posts } = await getAllPosts();

	return (
		<section>
			<PostItem data={posts} title="All Posts" load="Load more Posts" />
		</section>
	);
}

export default AllPostPage;
