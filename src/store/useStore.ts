import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IUserState {
  userId: string;
  username: string;
  email: string;
  setUser: (user: { userId: string; username: string; email: string }) => void;
  resetUser: () => void;
}

// Custom storage handler to correctly interface with Zustand persist
const customStorage = {
  getItem: (name: string) => {
    const item = localStorage.getItem(name);
    return item ? JSON.parse(item) : null;
  },
  setItem: (name: string, value: any) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name);
  },
};

export const useUserStore = create<IUserState>()(
  persist(
    (set) => ({
      userId: "",
      username: "",
      email: "",
      setUser: (user) => set(user),
      resetUser: () => set({ userId: "", username: "", email: "" }),
    }),
    {
      name: "user-storage", // Name of the key in storage
      storage: customStorage, // Use sessionStorage if needed
    }
  )
);
