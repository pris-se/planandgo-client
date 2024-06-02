import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { ProtectedRouteLayout } from "../layouts/ProtectedRouteLayout";
import { AuthPage } from "./Auth/AuthPage";
import { SignIn } from "./Auth/SignIn";
import { SignUp } from "./Auth/SignUp";
import { Calendar } from "./Calendar/Calendar";
import { MessagesPage } from "./Messages/MessagesPage";
import { MessagesBody } from "./Messages/MessagesBody";
import { FeedPage } from "./Feed/FeedPage";
import { NotFound } from "./common/NotFoundPage";
import { TasksPage } from "./Tasks/TasksPage";
import { CreateTaskPage } from "./Tasks/CreateTaskPage";
import { EditTaskPage } from "./Tasks/EditTaskPage";
import { TaskPage } from "./Tasks/TaskPage";
import { UsersPage } from "./Users/UsersPage";
import { Settings } from "./Users/Settings";
import { ProfilePage } from "./Users/ProfilePage";
import { EventsPage } from "./Events/EventsPage";

export const Pages = {
  MainLayout,
  ProtectedRouteLayout,
  AuthPage,
  SignIn,
  SignUp,
  Calendar,
  MessagesPage,
  MessagesBody,
  FeedPage,
  NotFound,
  TasksPage,
  CreateTaskPage,
  EditTaskPage,
  TaskPage,
  UsersPage,
  Settings,
  ProfilePage,
  EventsPage
}