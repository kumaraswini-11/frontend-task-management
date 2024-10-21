import { MenuIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { BiCategory, BiSolidCategory } from "react-icons/bi";
import { GoTasklist } from "react-icons/go";
import { Link, useLocation } from "react-router-dom";

import { cn } from "@/lib/utils";

import TaskManagementLogo from "../assets/task-management-logo.svg";
import { DottedSeparator } from "./dotted-separator";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const routes = [
  {
    label: "Tasks",
    to: "/tasks",
    icon: GoTasklist,
    activeIcon: GoTasklist,
  },
  {
    label: "Categories",
    to: "/categories",
    icon: BiCategory,
    activeIcon: BiSolidCategory,
  },
];

const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <ul className="flex flex-col">
      {routes.map((route) => {
        const isActive = location.pathname === route.to;
        const IconComponent = isActive ? route.activeIcon : route.icon;

        return (
          <Link key={route.to} to={route.to}>
            <div
              className={cn(
                "flex items-center gap-2.5 rounded-md p-2.5 font-medium text-neutral-500 transition hover:text-primary",
                isActive && "bg-white text-primary shadow-sm hover:opacity-100"
              )}
            >
              <IconComponent className="size-5 text-neutral-500" />
              <span>{route.label}</span>
            </div>
          </Link>
        );
      })}
    </ul>
  );
};

export const Sidebar: React.FC = () => {
  return (
    <aside className="h-full w-full bg-neutral-100 p-4">
      <Link to="/tasks" className="flex items-center gap-2">
        <img src={TaskManagementLogo} alt="Logo" width={60} height={30} />
        <span className="hidden font-medium md:block">Task Manager</span>
      </Link>
      <DottedSeparator className="my-4" />
      <Navigation />
    </aside>
  );
};

export const MobileSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const pathName = location.pathname;

  useEffect(() => {
    // I want to explicitly close my sidebar on menu click.
    setIsOpen(false);
  }, [pathName]);

  return (
    <Sheet modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="secondary"
          className="bg-white shadow lg:hidden"
        >
          <MenuIcon className="size-4 text-neutral-500" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};
