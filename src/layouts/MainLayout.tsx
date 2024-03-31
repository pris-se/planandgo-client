import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Header } from "../components/Header";
import { ScrollTop } from "../components/ScrollTop";
import { isDarkMode, setDarkMode } from "../redux/features/settings";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

export const MainLayout = () => {
	const dispatch = useAppDispatch();
	const isDark = useAppSelector(isDarkMode);

	useEffect(() => {
		dispatch(setDarkMode(isDark));
	}, [isDark]);

	return (
		<>
			<Header />
			<div className="wrapper header-fixed">
				<main className="content">
					<Outlet />
					<ToastContainer
						position="bottom-right"
						autoClose={1000}
						theme="colored"
					/>
				</main>
			</div>
			<ScrollTop />
		</>
	);
};
