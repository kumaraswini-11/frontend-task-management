import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import { LoginComponent } from "../components/auth/log-in";
import { SignupComponent } from "../components/auth/sign-up";
import { TaskLanding } from "../components/task/tasks-landing";
import { CategoryLanding } from "../components/category/category-landing";

import { ProtectedRoute } from "../components/protected-routes";
import { NotFound } from "../components/not-found";

export const routes = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <Navigate to="/login" /> },
      { path: "login", element: <LoginComponent /> },
      { path: "sign-up", element: <SignupComponent /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "tasks",
        children: [
          {
            path: "",
            element: <TaskLanding />,
          },
          // { path: "create", element: <CreateTask /> },
          // { path: "edit/:taskId", element: <EditTask /> },
          // { path: "category/:categoryId", element: <TasksByCategory /> },
          // { path: "status/:status", element: <TasksByStatus /> },
        ],
      },
      {
        path: "categories",
        children: [
          {
            path: "",
            element: <CategoryLanding />,
          },
          // { path: "create", element: <CreateCategory /> },
          // { path: "edit/:categoryId", element: <EditCategory /> },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
