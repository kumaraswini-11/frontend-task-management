import { FC, ReactNode, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { isAuthenticated } from "@/lib/utils";

import { Button } from "../ui/button";

export const AuthLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isSignUp = location.pathname == "/sign-up";

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/tasks");
    }
  }, [navigate]);

  return (
    <main className="min-h-screen bg-neutral-100">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="../../src/assets/task-management-logo.svg"
              alt="Task Management Logo"
              width={75}
              height={15}
            />
            <span className="hidden font-medium md:block">Task Manager</span>
          </div>
          <Button
            asChild
            variant="secondary"
            className="border-white bg-white shadow-md"
          >
            <Link to={isSignUp ? "/login" : "/sign-up"}>
              {isSignUp ? "Login" : "Sign Up"}
            </Link>
          </Button>
        </nav>
        {children}
      </div>
    </main>
  );
};
