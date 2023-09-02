import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { getMe } from "../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { ToastContainer } from "react-toastify";
import { ScrollTop } from "../components/ScrollTop"
import { BreadCrumbs } from "../components/Breadcrumbs";
import { ErrorPage } from "../pages/ErrorPage";

export const MainLayout = () => {
  const dispatch = useAppDispatch();
  // const {isLoading} = useAppSelector(state => state.auth)
  const { error } = useAppSelector(state => state.task)

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);


  if(error) {
    return <ErrorPage message={error}  />
  }
  return (
    <>
      <Header />
      <div className="wrapper header-fixed">
        <main className="content">
          {/* <BreadCrumbs /> */}
          <Outlet />
          <ToastContainer
            position="bottom-right"
            autoClose={1000}
            theme="colored"
          />
        </main>
      </div>
      {/* <ScrollTop /> */}
      {/* <Footer /> */}
    </>
  );
};
