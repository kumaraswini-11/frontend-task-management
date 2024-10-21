import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { LogOut } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserStore } from "@/store/useStore";

import { useLogoutMutation } from "./auth/auth-hooks";
import { DottedSeparator } from "./dotted-separator";

export const UserButton: React.FC = () => {
  const { username, email } = useUserStore();
  const logoutMutation = useLogoutMutation();

  const avatarFallback: string = username
    ? username.charAt(0).toUpperCase()
    : (email.charAt(0)?.toUpperCase() ?? "U"); // "U" - for User

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="relative outline-none">
        <Avatar className="size-10 border border-neutral-300 transition hover:opacity-75">
          <AvatarFallback className="flex items-center justify-center bg-neutral-200 font-medium text-neutral-500">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="bottom"
        className="w-60"
        sideOffset={10}
      >
        <div className="flex flex-col items-center justify-center gap-2 px-2.5 py-4">
          <Avatar className="size-[52px] rounded-full border border-neutral-300">
            <AvatarFallback className="flex items-center justify-center bg-neutral-200 text-xl font-medium text-neutral-500">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm font-medium text-neutral-900">
              {username || "User"}
            </p>
            <p className="text-xs text-neutral-500">{email}</p>
          </div>
        </div>
        <DottedSeparator className="mb-1" />
        <DropdownMenuItem
          onClick={handleLogout}
          className="flex h-10 cursor-pointer items-center justify-center font-medium text-amber-500"
        >
          <LogOut className="mr-2 size-4" /> Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
