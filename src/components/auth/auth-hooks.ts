import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

import { axiosInstance } from "@/lib/axios-config";
import { LoginSchema } from "@/schemas/sign-up-schema";
import { useUserStore } from "@/store/useStore";

export const useSignupMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (signUpData: any) => {
      const response = await axiosInstance.post("/users/signup", signUpData);
      return response.data;
    },
    onMutate: async () => {
      await queryClient.cancelQueries(["user"] as object);
    },
    onSuccess: () => {
      toast.success("Signup successful! Please log in.");
      queryClient.invalidateQueries(["user"] as object);
      navigate("/login");
    },
    onError: (error: any) => {
      console.error("Error signing up:", error);
      toast.error("Failed to sign up. Please try again.");
    },
  });
};

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const { setUser } = useUserStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (loginData: z.infer<typeof LoginSchema>) => {
      const response = await axiosInstance.post("/users/login", loginData);
      return response.data;
    },
    onMutate: async (loginData) => {
      await queryClient.cancelQueries(["user"] as object);
      setUser(loginData as any);
    },
    onSuccess: (data) => {
      setUser(data?.data);
      queryClient.invalidateQueries(["user"] as object);
      toast.success("Login successful.");
      navigate("/tasks");
    },
    onError: (error: any, _, context) => {
      console.error("Error logging in:", error);
      toast.error("Failed to login. Please try again.");
    },
  });
};

export const useLogoutMutation = () => {
  const navigate = useNavigate();
  const { resetUser } = useUserStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post("/users/logout");
      return response.data;
    },
    onMutate: async () => {
      // Cancel ongoing queries that might be affected by logout
      await queryClient.cancelQueries(["user"] as object);
    },
    onSuccess: () => {
      resetUser();
      // Invalidate user-related queries to fetch fresh data
      queryClient.invalidateQueries(["user"] as object);
      toast.success("Logged out successfully.", {
        description: "Visit again.",
      });
      navigate("/login");
    },
    onError: (error: any, _, context) => {
      toast.error("Failed to log out. Please try again.");
      console.error(`Logout error: ${error?.message || "Unknown error."}`);
    },
  });
};
