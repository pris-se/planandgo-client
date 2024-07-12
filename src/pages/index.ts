import { MainLayout } from "../layouts/MainLayout";
import { ProtectedRouteLayout } from "../layouts/ProtectedRouteLayout";
import { AuthPage } from "./Auth/AuthPage";
import { SignIn } from "./Auth/SignIn";
import { SignUp } from "./Auth/SignUp";
import { Calendar } from "./Calendar/Calendar";
import { NotFound } from "./common/NotFoundPage";
import { EventsPage } from "./Events/EventsPage";
import { FeedPage } from "./Feed/FeedPage";
import { MessagesBody } from "./Messages/MessagesBody";
import { MessagesPage } from "./Messages/MessagesPage";
import { CreateTaskPage } from "./Tasks/CreateTaskPage";
import { EditTaskPage } from "./Tasks/EditTaskPage";
import { TaskPage } from "./Tasks/TaskPage";
import { TasksPage } from "./Tasks/TasksPage";
import { ProfilePage } from "./Users/ProfilePage";
import { Settings } from "./Users/Settings";
import { UsersPage } from "./Users/UsersPage";

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
  EventsPage,
}