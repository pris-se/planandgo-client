import {
	createBrowserRouter,
	createRoutesFromElements,
	Route
} from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { ProtectedRouteLayout } from "../layouts/ProtectedRouteLayout";
import { Pages } from "./index"


export const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<MainLayout />}>
				<Route path="/auth" element={<Pages.AuthPage />}>
					<Route index element={<Pages.SignIn />} />
					<Route path="register" element={<Pages.SignUp />} />
				</Route>
				<Route element={<ProtectedRouteLayout />}>
					<Route index element={<Pages.FeedPage />} />
					<Route path="users">
						<Route index element={<Pages.UsersPage />} />
						<Route path=":id" element={<Pages.ProfilePage />} />
					</Route>
					<Route path="settings" element={<Pages.Settings />} />
					<Route path="tasks">
						<Route index element={<Pages.TasksPage />} />
						{/* TODO path */}
						<Route path="create" element={<Pages.CreateTaskPage />} />
						<Route path=":id" element={<Pages.TaskPage />} />
						<Route path="edit/:id" element={<Pages.EditTaskPage />} />
					</Route>
					<Route path="/events" element={<Pages.EventsPage />} />
					{/* <Route path="/calendar" element={<Pages.Calendar />} /> */}
					<Route path="/messages" element={<Pages.MessagesPage />} />
				</Route>
			</Route>
			<Route path="/*" element={<Pages.NotFound />} />
		</>
	)
);
