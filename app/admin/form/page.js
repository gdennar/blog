import { Suspense } from "react";
import AdminForm from "../../components/admin/AdminForm";

const Adminpage = () => {
	return (
		<div>
			<Suspense fallback="Loading...">
				<AdminForm />
			</Suspense>
		</div>
	);
};

export default Adminpage;
