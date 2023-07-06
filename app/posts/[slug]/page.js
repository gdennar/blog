import DetailHeader from "@/app/components/post-detail/DetailHeader";
import DetailPage from "@/app/components/post-detail/DetailPage";
import { Suspense } from "react";
import Comments from "@/app/components/comments/Comments";
import { getPostBySlug } from "@/app/lib/mongo/posts";

export const dynamic = "force-dynamic";

async function PostDetail({ params: { slug } }) {
	const { posts } = await getPostBySlug(slug);

	return (
		<section>
			<Suspense fallback={<div>Loading...</div>}>
				<DetailHeader post={posts} />
			</Suspense>
			<Suspense fallback={<div>Loading post...</div>}>
				<DetailPage posts={posts} />
			</Suspense>
			<Suspense fallback={<div>Loading post...</div>}>
				<Comments className="mb-10" slug={slug} />
			</Suspense>
		</section>
	);
}

export default PostDetail;
