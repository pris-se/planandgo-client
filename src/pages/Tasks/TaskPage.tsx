import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CardsSwiper } from "../../components/CardsSwiper";
import { Duration } from "../../components/Duration";
import { Loader } from "../../components/Loader";
import { Modal } from "../../components/modals/Modal";
import { Button } from "../../components/ui/Button";
import { getById, getTasks, removeTask } from "../../redux/features/tasks";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addTagLink } from "../../utils/tagsFilter";
import { formatTime } from "../../utils/time";
import { AssignTaskModal } from "./AssignTaskModal";

import { ReactComponent as BinIcon } from "../../assets/img/bin.svg";
import placeholderImage from "../../assets/img/placeholder.png";

export const TaskPage = () => {
	const dispatch = useAppDispatch();
	const { task, isLoading: isTaskLoading } = useAppSelector((state) => state.task);
	const { tasks, isLoading: isTasksLoading } = useAppSelector((state) => state.tasks);

	const userId = useAppSelector((state) => state.profile.me?._id);
	const role = useAppSelector((state) => state.profile.me?.role);

	const [deleteModalShow, setDeleteModalShow] = useState(false);
	const [assignTaskModalShow, setAssignTaskModalShow] = useState(false);
	const navigate = useNavigate();
	const { id } = useParams();
	const removeHandler = async () => {
		try {
			if (id) {
				const task = await dispatch(removeTask(id));
				if (task) {
					toast(task?.payload.message);
					navigate(-1);
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (id && task?._id !== id) {
			dispatch(getById(id))
		}
	}, [dispatch, id]);

	useEffect(() => {
		if (task?.category) {
			const query = new URLSearchParams()
			query.append("category", task?.category)
			dispatch(getTasks(query.toString()))
			// dispatch(getTasks(`category=${task?.category}`))
		}
	}, [task])

	if (!task) {
		return <p>There is no tasks</p>;
	}

	return (
		<>
			<div className="section">
				<div className="container">
					<div className="page-heading">
						<h2 className="page-title">Task Page</h2>
					</div>
					{
						!isTaskLoading ?
							<div className="row row--md">
								<div className="col-lg-4">
									<div className="image-big">
										<img
											className="w-full h-full"
											src={
												task?.img
													? process.env.REACT_APP_BASE_IMAGE_URL + task?.img
													: placeholderImage
											}
											alt={task?.title}
										/>
										<span className="label">{task?.category}</span>
										{userId === task?.createdBy && (
											<span className="label label--left label--success">
												Creator
											</span>
										)}
										<div className="image-big__bottom">
											<span>
												<span className="font-semibold">Average Duration: </span>
												{task?.assignCount && (
													<Duration time={formatTime(task?.duration / task?.assignCount)} />
												)}
											</span>

											<span>
												<span className="font-semibold">Usage: </span>
												{task?.assignCount} times
											</span>
										</div>
									</div>
								</div>
								<div className="col-lg-8">
									<div className="flex flex-col h-full">
										<div className="flex items-center justify-between mb-8">
											<h2>{task?.title}</h2>
											{(role === "admin" || userId === task?.createdBy) && (
												<div className="row-group gap--xs">
													<Button
														onClick={() => setDeleteModalShow(true)}
														classes="btn--outline-danger btn--square btn--sm"
													>
														<span className="ico">
															<BinIcon />
														</span>
													</Button>
													<Link
														to={"/tasks/edit/" + task?._id ?? "error"}
														className="btn rounded btn--outline-warning btn--square btn--sm"
													>
														<span className="ico">
															<svg width={24} hanging={24} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
																<path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" fill="currentColor" />
															</svg>
														</span>
													</Link>
												</div>
											)}

										</div>
										<p className="text-pretty">
											{addTagLink(task?.description).map((str, idx) => {
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
											})}
										</p>
										<div className="row-group justify-between mt-auto pt-5">
											<div className="row-group gap--xs ml-auto">
												<Button classes=" btn--primary btn--md max-w-32" onClick={() => setAssignTaskModalShow(true)}>
													Assign to me
												</Button>
											</div>
										</div>
									</div>
								</div>
							</div>
							:
							<Loader />
					}
				</div>
			</div>
			<hr />
			{!isTaskLoading && !isTasksLoading ?
				<div className="section">
					<div className="container">
						<h2 className="page-heading">You may also like...</h2>
						{
							!isTasksLoading ?
								<CardsSwiper tasks={tasks.filter(t => t._id != task._id)} />
								:
								<Loader />
						}
					</div>
				</div>
				:
				null
			}

			{deleteModalShow && (
				<>
					<Modal
						show={deleteModalShow}
						title="Delete Task"
						onClose={() => setDeleteModalShow(false)}
					>
						<div>
							<p>Are you sure you want to delete {task?.title} task</p>
							<div className="popup-footer">
								<Button onClick={removeHandler}>Delete</Button>
								<Button onClick={() => setDeleteModalShow(false)}>Cancel</Button>
							</div>
						</div>
					</Modal>
				</>
			)}
			{
				assignTaskModalShow &&
				<AssignTaskModal show={assignTaskModalShow} onClose={() => setAssignTaskModalShow(false)} task={task} />
			}
		</>
	);
};
