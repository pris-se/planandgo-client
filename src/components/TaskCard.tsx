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
						<span className="badge badge--left badge--success">
							<span className="ico">
								<svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 576 512">
									<path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" fill="currentColor" />
								</svg>
							</span>
						</span>
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
