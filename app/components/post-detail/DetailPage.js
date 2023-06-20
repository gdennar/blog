import Image from "next/image";
import classes from "./DetailsPage.module.css";

const DetailPage = ({ posts }) => {
	const newDate = new Date(posts.date).toLocaleDateString("en-US", {
		day: "numeric",
		month: "short",
		year: "numeric",
	});
	return (
		<div className={`${classes.detail} container mt-20 mb-10`}>
			<div className="text-center mb-3">
				<div className={`${classes.postImage} mb-3`}>
					<Image
						src={posts.imageUrl}
						alt="blogImage"
						width={300}
						height={300}
					/>
				</div>
				<time>
					{newDate} - {`6 Comments`}
				</time>
			</div>
			<hr />
			<div className={`${classes.postDetails} mt-10`}>
				<p className="pt-3 ">{posts.description}</p>
			</div>
		</div>
	);
};

export default DetailPage;
