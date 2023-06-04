<<<<<<< HEAD
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { getMe } from "../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { ToastContainer } from "react-toastify";

export const MainLayout = () => {
  const dispatch = useAppDispatch();
  const {isLoading} = useAppSelector(state => state.auth)

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);
=======
import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { getMe } from '../redux/features/auth/authSlice'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { ToastContainer } from 'react-toastify';

export const MainLayout = () => {

  const dispatch = useAppDispatch()

  const { isLoading } = useAppSelector(state => state.auth)

  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])



>>>>>>> d3daaf74810b482b9cbcd43d6913457704477bfc

  return (
    <>
      <Header />
<<<<<<< HEAD
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
      {/* <Footer /> */}
    </>
  );
};
=======
      <div className='wrapper header-fixed'>
        <main className='content'>
          <Outlet />

          <ToastContainer position='bottom-right' autoClose={1000} theme="colored"/>
        </main>
      </div>
      <Footer />
    </>
  )
}
>>>>>>> d3daaf74810b482b9cbcd43d6913457704477bfc
