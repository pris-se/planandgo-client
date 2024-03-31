import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/Button";



export const BreadCrumbs = ({ breadcrumbs = [] }: { breadcrumbs?: { label: string, route: string }[] }) => {
	const navigate = useNavigate()
	return (
		<div className="breadcrumbs-wrapper">
			<ul className="breadcrumbs">
				{breadcrumbs.map((crumb, index) => (
					<li key={index}>
						<Link to={crumb.route}>{crumb.label}</Link>
					</li>
				))}
			</ul>
		</div>
		// <Button onClick={() => navigate(-1)} className="btn btn--primary btn--sm rounded">Back</Button>
	);
};
