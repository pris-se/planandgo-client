import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Link,
  Route,
} from "react-router-dom";
import { AuthPage } from "./AuthPage/AuthPage";
import { SignIn } from "./AuthPage/SignIn";
import { SignUp } from "./AuthPage/SignUp";
import { Loader } from "../components/Loader";
import { MainLayout } from "../Layouts/MainLayout";
import { AllTasksPage } from "./TaskPage/AllTasksPage";
import { CreateTaskPage } from "./TaskPage/CreateTaskPage";
import { EditTaskPage } from "./TaskPage/EditTaskPage";
import { HomePage } from "./HomePage";
import { NotFound } from "./NotFoundPage";
import { TaskPage } from "./TaskPage/TaskPage";
import { SplashScreen } from "./SplashScreen";


export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
        <Route path="/" element={<MainLayout />}>
          <Route path="/auth" element={<AuthPage />}>
            <Route index element={<SignIn />} />
            <Route path="register" element={<SignUp />} />
          </Route>
          <Route path="/" element={<HomePage />} />
          <Route path="/tasks">
            <Route index element={<AllTasksPage />} />
            <Route path="create" element={<CreateTaskPage />} />
            <Route path=":id" element={<TaskPage />} />
            <Route path="edit/:id" element={<EditTaskPage />} />
          </Route>
        </Route>
        <Route path="/*" element={<NotFound />} />
        <Route path="/loader" element={<Loader />} />
        <Route path="/splash" element={<SplashScreen />} />
    </>
  )
);