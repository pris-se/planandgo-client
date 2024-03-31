import { useEffect } from "react";
import {
	useLocation
} from "react-router-dom";
import { Loader } from "../../components/Loader";
import { TaskCard } from "../../components/TaskCard";
import { getTasks } from "../../redux/features/tasks";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

export const UserTasksPage = ({ userId }: { userId: string }) => {
	const dispatch = useAppDispatch();
	const { tasks, isLoading } = useAppSelector((state) => state.tasks);
	const { search } = useLocation();

	useEffect(() => {
		if (userId) {
			const query = new URLSearchParams(search)
			query.append("createdBy", userId)
			dispatch(getTasks(query.toString()));
		}
	}, [dispatch, userId, search]);

	return (
		<>
			<div className="section">
				<div className="container">
					<div className="page-heading">
						<h2 className="page-title">Tasks <span className="info">({tasks.length})</span></h2>
						<div className="row-group gap-xs justify-between">
						</div>
					</div>
					{
						tasks && !tasks.length ?
							<div className="text-center py-14 w-full">
								<p>There is no tasks yet</p>
							</div>
							:
							null
					}
					{
						isLoading ?
							<div className="mt-12">
								<Loader />
							</div>
							:
							<div className="row row--lg">
								{tasks &&
									tasks.map((task) => (
										<div className="col-xl-3 col-lg-4 col-sm-6" key={task._id}>
											<TaskCard task={task} />
										</div>
									))}
							</div>
					}
				</div>
			</div>
		</>
	);
};
