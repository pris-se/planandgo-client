import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import placeholderImage from "../assets/img/placeholder.png";
import { Event, Task } from "../interfaces";
import { getUser } from "../redux/features/users";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getImageUrl } from "../utils/helpers";
import { addTagLink } from "../utils/tagsFilter";
import { formatTime } from "../utils/time";
import { Duration } from "./Duration";
import moment, { Moment } from 'moment';


interface Props {
	event: Event;
}

interface TimerProps {
	startTime: string | Date;
}

const formattedDuration = (duration: number) => {
	return moment.utc(moment.duration(duration).asMilliseconds()).format('HH:mm:ss')
}

const Timer: React.FC<TimerProps> = ({ startTime }) => {
	const [duration, setDuration] = useState(moment.duration(+moment() - +moment(startTime)));

	useEffect(() => {
		const interval = setInterval(() => {
			setDuration(moment.duration(+moment() - +moment(startTime)));
		}, 1000);

		return () => clearInterval(interval);
	}, [startTime]);


	return (
		<span className="color-danger">
			{formattedDuration(+duration)}
		</span>
	);
};



const EventCard = ({ event }: Props) => {
	const userId = useAppSelector((state) => state.profile.me?._id);
	const user = useAppSelector(state => state.users.user)
	const dispatch = useAppDispatch()
	const task = event.task as Task

	// useEffect(() => {
	// 	if (!event.userId) return;
	// 	dispatch(getUser(event.userId))
	// }, [event])

	if (!event) return null

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

	const duration = +moment(event.end) - +moment(event.start)
	return (
		<>
			<div className="card">
				<div className="card-image image-wrapper">
					{/* <div className="absolute left-6 top-6">
						<img className="!w-14 !h-14 aspect-square" src={user?.avatar ? getImageUrl(user.avatar) : placeholderImage} alt={user?.firstName} />
					</div> */}
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
								<span className="font-semibold">Duration: </span>
								{+moment(event.end) < +moment() ?
									<Duration time={formatTime(+moment(duration))} />
									:
									<Timer startTime={event.start} />
								}
							</span>
							<span className="card-info">
								<span className="font-semibold">Estimated duration: </span> 
								{formattedDuration(+moment(duration))}
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
}

export default EventCard