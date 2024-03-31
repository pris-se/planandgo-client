import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import placeholderImage from "../assets/img/placeholder.png";
import { Task } from "../interfaces";
import { useAppSelector } from "../redux/hooks";
import { getImageUrl } from "../utils/helpers";
import { addTagLink } from "../utils/tagsFilter";
import { formatTime } from "../utils/time";
import { Duration } from "./Duration";

interface Props {
	task: Task;
}

export const TaskCard = ({ task }: Props) => {
	const userId = useAppSelector((state) => state.profile.me?._id);

	const formatedDesc = addTagLink(task.description).map(
		(str, idx) => {
			if (str?.link) {
				return (
					<Link
						className="tag"
						to={{
							pathname: "/tasks",
							search: `tags=${str.link}`,
						}}
						key={idx}
					>
						{str.string}{" "}
					</Link>
				);
			} else {
				return str.string + " ";
			}
		}
	);
	return (
		<>
			<div className="card">
				<div className="card-image image-wrapper">
					{userId === task.createdBy && (
						<span className="badge badge--left badge--success">Creator</span>
					)}
					<img
						className="w-full h-full"
						src={
							task?.img
								? getImageUrl(task.img)
								: placeholderImage
						}
						alt={task?.title}
					/>
					<span className="badge">{task.category}</span>
				</div>
				<div className="card-body">
					<h3 className="card-title">{task.title}</h3>
					<p className="card-description">{formatedDesc}</p>
					<div className="card-footer">
						<div className="card-row">
							<span className="card-info">
								<span className="font-semibold">Avg dur:</span>{" "}
								{task.assignCount && (
									<Duration time={formatTime(task.duration / task.assignCount)} />
								)}
							</span>
							<span className="card-info">
								<span className="font-semibold">Usage:</span> {task.assignCount}
							</span>
						</div>
						<div className="card-actions">
							<Link
								to={"/tasks/" + task._id ?? "error"}
								className="btn btn--primary rounded w-full btn--lg"
								key={task._id}
							>
								View Task
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
