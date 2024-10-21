import { MobileSidebar } from "./sidebar";
import { UserButton } from "./user-button";

export const Navbar: React.FC = () => {
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
