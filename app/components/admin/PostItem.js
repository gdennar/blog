import { useEditPost } from "@/app/lib/api-utils";
import { useRouter } from "next/navigation";

const PostItem = (props) => {
	const { posts, onDelete } = props;
	const { loading } = useEditPost();
	const router = useRouter();

	const handleEdit = (slug) => {
		router.push(`/admin/form/?slug=${slug}`);
	};

	return (
		<>
			{posts.map((post, index) => {
				return (
					<tr className="table-row p-10" key={post.slug}>
						<td className="table-cell border px-8 py-4">{index + 1}</td>
						<td className="table-cell border px-8 py-4">{post.title}</td>
						<td className="table-cell border px-8 py-4">
							{post.description.substring(0, 19).concat("...")}
						</td>
						<td className="table-cell border px-8 py-4">{post.slug}</td>
						<td className="border px-8 py-4">
							<button
								className="bg-edit text-white p-2 rounded-md "
								onClick={() => handleEdit(post.slug)}
							>
								{loading ? "Loading..." : "Edit"}
							</button>
						</td>
						<td className="border px-8 py-4">
							<button
								className="bg-delete text-white p-2 rounded-md"
								onClick={() => onDelete(post.slug)}
							>
								Delete
							</button>
						</td>
					</tr>
				);
			})}
		</>
	);
};

export default PostItem;
