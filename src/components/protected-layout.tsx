import { ReactNode } from "react";

import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";

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
            <main className="flex h-auto flex-col px-6 py-6">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
};
