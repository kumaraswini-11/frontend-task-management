import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { axiosInstance } from "@/lib/axios-config";
import { Task, TaskTable } from "@/types/task-types";

export const useCreateTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newTaskData: Task) => {
      const response = await axiosInstance.post("/tasks?", newTaskData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"] as object);
      toast.success("Task created successfully.");
    },
    onError: (error: any) => {
      console.error("Error creating task:", error);
      toast.error("Failed to create task.");
    },
  });
};

export const useFetchTasksQuery = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await axiosInstance.get("/tasks");
      return response.data;
    },
    // staleTime: 5 * 60 * 1000, // Data is considered fresh for 5 minutes
    // onError: (error: any) => {
    //   console.error("Error fetching tasks:", error);
    // },
  });
};

export const useUpdateTaskMutation = () => {
  return useMutation({
    mutationFn: async ({ taskDetails }: { taskDetails: TaskTable }) => {
      const response = await axiosInstance.put(
        // @ts-ignore
        `/tasks/${taskDetails?.id}`,
        taskDetails
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Task updated successfully.");
    },
    onError: (error: any) => {
      console.error("Error updating task:", error);
      toast.error("Failed to update task.");
    },
  });
};

export const useDeleteTaskMutation = () => {
  return useMutation({
    mutationFn: async (taskId: string) => {
      const response = await axiosInstance.delete(`/tasks/${taskId}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Task deleted successfully.");
    },
    onError: (error: any) => {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task.");
    },
  });
};
