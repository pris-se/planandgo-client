import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { getMe } from "../redux/thunks/authThunk";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { ToastContainer } from "react-toastify";
import { isDarkMode, setDarkMode } from "../redux/slices/mainSlice";

export const MainLayout = () => {
  const dispatch = useAppDispatch();
  const isDark = useAppSelector(isDarkMode);
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);
  useEffect(() => {
    dispatch(setDarkMode(isDark));
    console.log(isDark);
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
    </>
  );
};
