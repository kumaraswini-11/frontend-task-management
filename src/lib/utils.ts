import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useUserStore } from "@/store/useStore";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isAuthenticated = (): boolean => {
  const { userId } = useUserStore.getState();
  return userId ? userId.length > 0 : false;
};
