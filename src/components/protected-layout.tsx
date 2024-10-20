import { ReactNode } from "react";
import { MobileSidebar, Sidebar } from "./sidebar";
import { UserButton } from "./user-button";

export const ProtectedLayout: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <div className="min-h-screen">
      <div className="flex h-full w-full">
        <div className="fixed left-0 top-0 hidden h-full overflow-y-auto lg:block lg:w-[264px]">
          <Sidebar />
        </div>
        <div className="w-full lg:pl-[264px]">
          <div className="mx-auto h-full max-w-screen-2xl">
            <Navbar />
            <main className="flex h-full flex-col px-6 py-8">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
};

const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center justify-between px-6 pt-4">
      <div className="hidden flex-col lg:flex">
        {/* TODO: It will be a breadcrumb in the future, replacing H1. */}
        <h1 className="text-2xl font-semibold">
          Task Dashboard
          {/* TODO: Breadcrumb Coming Soon */}
        </h1>
        <span className="text-muted-foreground">
          Monitor all of your tasks here.
        </span>
      </div>
      <MobileSidebar />
      <UserButton />
    </nav>
  );
};
