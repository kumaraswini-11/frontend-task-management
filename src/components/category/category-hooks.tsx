import { axiosInstance } from "@/lib/axios-config";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newCategoryData: { name: string }) => {
      const response = await axiosInstance.post("/categories", newCategoryData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"] as object);
      toast.success("Category created successfully.");
    },
    onError: (error: any) => {
      console.error("Error creating task:", error);
      toast.error("Failed to create task.");
    },
  });
};

export const useFetchCategoriesQuery = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axiosInstance.get("/categories");
      return response.data;
    },
    // staleTime: 5 * 60 * 1000, // Data is considered fresh for 5 minutes
    // onError: (error: any) => {
    //   console.error("Error fetching tasks:", error);
    // },
  });
};

export const useUpdateCategoryMutation = () => {
  return useMutation({
    mutationFn: async ({
      categoryDetails,
    }: {
      categoryDetails: { categoryId: number; name: string };
    }) => {
      const response = await axiosInstance.put(
        `/categories/${categoryDetails.categoryId}`,
        categoryDetails
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Category updated successfully.");
    },
    onError: (error: any) => {
      console.error("Error updating task:", error);
      toast.error("Failed to update task.");
    },
  });
};

export const useDeleteCategoryMutation = () => {
  return useMutation({
    mutationFn: async (category: string) => {
      const response = await axiosInstance.delete(`/categories/${category}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Category deleted successfully.");
    },
    onError: (error: any) => {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task.");
    },
  });
};
