import { useUserStore } from "@/store/useStore";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DottedSeparator } from "./dotted-separator";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LiaPrayingHandsSolid } from "react-icons/lia";
import { useMutation } from "@tanstack/react-query";
import { baseUrl } from "@/lib/constants";

export const UserButton: React.FC = () => {
  const { username, email, resetUser } = useUserStore();
  const navigate = useNavigate();

  const avatarFallback: string = username
    ? username.charAt(0).toUpperCase()
    : (email.charAt(0)?.toUpperCase() ?? "U"); // "U" - for User

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${baseUrl}/users/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // "ok" property is a default behavior of the fetch API, and it is not something we need to explicitly send from the backend.
      if (!response.ok) {
        throw new Error("Failed to log out.");
      }

      return response.json();
    },
    onSuccess: () => {
      resetUser();
      toast.success("Logged out successfully.", {
        description: <LiaPrayingHandsSolid />,
      });
      navigate("/login");
      // window.location.reload();
    },
    onError: (error: any) => {
      toast.error("Failed to log out. Please try again.");
      console.log(
        `Failed to log out. ${error?.message || "Please try again."}`
      );
    },
  });

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
          onClick={() => mutation.mutate()}
          className="flex h-10 cursor-pointer items-center justify-center font-medium text-amber-500"
        >
          <LogOut className="mr-2 size-4" /> Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
