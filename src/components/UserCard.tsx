import moment from 'moment';
import { Link } from 'react-router-dom';
import placeholderImage from "../assets/img/placeholder.png";
import { User } from '../interfaces';
import { getImageUrl } from '../utils/helpers';


interface Props {
	user: User
}

export const UserCard = ({ user }: Props) => {

	return (
		<div className="card">
			<div className="card-image">
				<img
					className="w-full h-full"
					src={user?.avatar ? getImageUrl(user.avatar) : placeholderImage}
					alt={user?.username}
				/>
				<span className="badge">{user.role}</span>
			</div>
			<div className="card-body">
				<h3 className="card-title">{user.username}</h3>
				<p className="card-desc">{user.email}</p>
				<div className="card-footer">
					<div className="card-row">
						<span className="card-info">
							<span className="font-semibold">Member since: </span>
							{
								user?.createdAt &&
								moment(user.createdAt).format("DD MMM, YYYY")}
						</span>
						<span className="card-info font-semibold">
							<span className={user.status === "online" ? "text-success" : ""}>{user.status}</span>
						</span>
					</div>
					<div className="card-actions">
						<Link
							to={`/users/${user._id}`}
							className="btn btn--primary rounded w-full btn--lg"
							key={user._id}
						>
							View User
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
