import { useEffect } from "react";
import {
	NavLink
} from "react-router-dom";
import { Loader } from "../../components/Loader";
import { TaskCard } from "../../components/TaskCard";
import { getTasks } from "../../redux/features/tasks";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { EmptyTaskPage } from "./EmptyTaskPage";

import { ReactComponent as PlusIcon } from "../../assets/img/plus.svg";
import { SearchFilters } from "../../components/SearchFilters";
import { ViewTypeSwitch } from "../../components/ViewTypeSwitch";
import { categories } from "../../data/data";
import { useQueryParams } from "../../hooks/useQueryParams";
import { isListView } from "../../redux/features/settings";

export const TasksPage = () => {
	const dispatch = useAppDispatch();
	const { tasks, isLoading } = useAppSelector((state) => state.tasks);
	const { query, getQueryParam } = useQueryParams()
	const isList = useAppSelector(isListView)

	useEffect(() => {
		dispatch(getTasks(query));
	}, [dispatch, query]);


	const filters = {
		input: { label: "title", title: 'Title', value: getQueryParam("title"), },
		select: { label: 'category', title: 'Category', value: getQueryParam("category"), suggestions: categories },
	}


	return (
		<>
			<div className="section">
				<div className="container">
					<div className="page-heading">
						<h2 className="page-title">Community Tasks</h2>
						<div className="row-group gap-xs justify-between">
							<ViewTypeSwitch />
						</div>
					</div>
					<SearchFilters filtersProps={filters} filtersName="Tasks" />
					{
						isLoading &&
						<div className="mt-12">
							<Loader />
						</div>
					}
					{
						(!isLoading && tasks && !!tasks.length) &&
						<div className={`row row--lg ${isList ? "list-view" : ""}`}>
							{tasks &&
								tasks.map((task) => (
									<div className="col-xl-3 col-lg-4 col-sm-6" key={task._id}>
										<TaskCard task={task} />
									</div>
								))}
						</div>
					}
					{
						(!isLoading && tasks && !tasks.length) &&
						<EmptyTaskPage />
					}
				</div>
			</div>

			<NavLink
				to="/tasks/create"
				className={({ isActive }) =>
					isActive ? "hidden" : "btn btn--create btn--square"
				}
			>
				<PlusIcon />
			</NavLink>
		</>

	);
};
