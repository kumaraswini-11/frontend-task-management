import { create } from "zustand";

interface IUserState {
  userId: string;
  username: string;
  email: string;
  setUser: (user: { userId: string; username: string; email: string }) => void;
  resetUser: () => void;
}

export const useUserStore = create<IUserState>((set) => ({
  userId: "",
  username: "",
  email: "",
  setUser: (user) => set(user),
  resetUser: () => set({ userId: "", username: "", email: "" }),
}));
