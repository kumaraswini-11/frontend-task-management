import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import { Login } from "../components/auth/login";
import { Signup } from "../components/auth/signup";

import { ProtectedRoute } from "../components/protected-routes";
import { NotFound } from "../components/not-found";

// const Tasks = lazy(() => import('../components/tasks/Tasks'));
// const CreateTask = lazy(() => import('../components/tasks/CreateTask'));
// const EditTask = lazy(() => import('../components/tasks/EditTask'));
// const TasksByCategory = lazy(() => import('../components/tasks/TasksByCategory'));
// const TasksByStatus = lazy(() => import('../components/tasks/TasksByStatus'));
// const Categories = lazy(() => import('../components/categories/Categories'));
// const CreateCategory = lazy(() => import('../components/categories/CreateCategory'));
// const EditCategory = lazy(() => import('../components/categories/EditCategory'));
// const NotFound = lazy(() => import('../components/NotFound'));

export const routes = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <Navigate to="/login" /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "tasks",
        children: [
          // { path: "", element: <Tasks /> },
          // { path: "create", element: <CreateTask /> },
          // { path: "edit/:taskId", element: <EditTask /> },
          // { path: "category/:categoryId", element: <TasksByCategory /> },
          // { path: "status/:status", element: <TasksByStatus /> },
        ],
      },
      {
        path: "categories",
        children: [
          // { path: "", element: <Categories /> },
          // { path: "create", element: <CreateCategory /> },
          // { path: "edit/:categoryId", element: <EditCategory /> },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
