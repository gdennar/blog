import PostItem from "../components/posts/PostItem";
import { getData } from "@/app/lib/fetch";

async function AllPostPage() {
	const data = await getData();
	return (
		<section>
			<PostItem data={data} title="All Posts" load="Load more Posts" />
		</section>
	);
}

export default AllPostPage;
