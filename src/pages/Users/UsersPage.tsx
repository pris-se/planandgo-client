import { useEffect } from "react";
import {
	useLocation
} from "react-router-dom";
import { Loader } from "../../components/Loader";
import { SearchFilters } from "../../components/SearchFilters";
import { UserCard } from "../../components/UserCard";
import { ViewTypeSwitch } from "../../components/ViewTypeSwitch";
import { roles } from "../../data/data";
import { isListView } from "../../redux/features/settings";
import { getUsers } from "../../redux/features/users";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useQueryParams } from "../../hooks/useQueryParams";


export const UsersPage = () => {
	const dispatch = useAppDispatch();
	const { users, isLoading } = useAppSelector((state) => state.users);
	const { query, getQueryParam } = useQueryParams()


	const isList = useAppSelector(isListView)


	useEffect(() => {
		dispatch(getUsers(query));
	}, [dispatch, query]);


	if (users && !users.length) {
		return <h1>There is no users yet</h1>;
	}


	const filters = {
		input: { label: "username", title: 'User Name', value: getQueryParam("username") },
		select: { label: 'role', title: 'Role', value: getQueryParam("role"), suggestions: roles },
	}

	return (
		<div className="section">
			<div className="container">
				<div className="page-heading">
					<h2 className="page-title">Community users</h2>
					<div className="row-group gap-xs justify-between">
						<ViewTypeSwitch />
					</div>
				</div>
				<SearchFilters filtersProps={filters} filtersName="Users" />

				{
					isLoading ?
						<div className="mt-12">
							<Loader />
						</div>
						:
						<div className={`row row--lg ${isList ? "list-view" : ""}`} >
							{users &&
								users.map((user) => (
									<div className="col-xl-3 col-lg-4 col-sm-6" key={user._id}>
										<UserCard user={user} />
									</div>
								))}
						</div>
				}
			</div>
		</div>
	);
};
