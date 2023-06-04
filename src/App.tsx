import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainLayout } from './Layouts/MainLayout';
import { CreateTaskPage } from './pages/CreateTaskPage';
<<<<<<< HEAD
import { LoginPage } from './pages/AuthPage/SignIn';
import { NotFound } from './pages/NotFoundPage';
import { RegisterPage } from './pages/AuthPage/SignUp';
=======
import { LoginPage } from './pages/LoginPage';
import { NotFound } from './pages/NotFoundPage';
import { RegisterPage } from './pages/RegisterPage';
>>>>>>> d3daaf74810b482b9cbcd43d6913457704477bfc
import { AllTasksPage } from './pages/AllTasksPage';
import { HomePage } from './pages/HomePage';
import { TaskPage } from './pages/TaskPage';
import { EditTaskPage } from './pages/EditTaskPage';
<<<<<<< HEAD
import { AuthPage } from './pages/AuthPage/Auth';
import { Loader } from './components/Loader';
=======
import { AuthPage } from './pages/AuthPage';
>>>>>>> d3daaf74810b482b9cbcd43d6913457704477bfc

function App() {

  // TODO: Cash data, divide slice, divide components


  return (
    <Routes>
      <Route
        path='/'
        element={<MainLayout />}
      >
        <Route
          path='/auth' element={<AuthPage />} >
          <Route index element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
        </Route>
        <Route
          path='/'
          element={<HomePage />} />
        <Route
          path='/tasks'>
          <Route index element={<AllTasksPage />} />
          <Route path='create' element={<CreateTaskPage />} />
          <Route path=':id' element={<TaskPage />} />
          <Route path='edit/:id' element={<EditTaskPage />} />
        </Route>
      </Route>
      <Route
        path='/*'
        element={<NotFound />} />
<<<<<<< HEAD
      <Route
        path='/loader'
        element={<Loader />} />
=======
>>>>>>> d3daaf74810b482b9cbcd43d6913457704477bfc
    </Routes>
  );
}

export default App;
