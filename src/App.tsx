import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainLayout } from './Layouts/MainLayout';
import { CreateTaskPage } from './pages/CreateTaskPage';
import { LoginPage } from './pages/LoginPage';
import { NotFound } from './pages/NotFoundPage';
import { RegisterPage } from './pages/RegisterPage';
import { AllTasksPage } from './pages/AllTasksPage';
import { HomePage } from './pages/HomePage';
import { TaskPage } from './pages/TaskPage';
import { EditTaskPage } from './pages/EditTaskPage';
import { AuthPage } from './pages/AuthPage';

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
    </Routes>
  );
}

export default App;
