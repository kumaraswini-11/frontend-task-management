import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TaskStatus } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { TaskSchema } from "@/schemas/task-schema";
import { CreationAndUpdateTaskFormProps, Task } from "@/types/task-types";

import { useFetchCategoriesQuery } from "../category/category-hooks";
import { DottedSeparator } from "../dotted-separator";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  // FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const TaskCreationAndUpdateForm: React.FC<
  CreationAndUpdateTaskFormProps
> = ({ onCreate, isEditMode = false, initialValues }) => {
  const { data: categories, isLoading: isCategoriesLoading } =
    useFetchCategoriesQuery();
  const isSubmitting = false;
  // console.log("test", categories);
  // const isCategoriesLoading = false;

  const createTaskForm = useForm<Task>({
    resolver: zodResolver(TaskSchema),
    defaultValues: initialValues || {
      title: "",
      description: "",
      status: TaskStatus.PENDING,
      dueDate: new Date(),
      category: "",
    },
  });

  console.log("1");
  const onSubmit = (values: Task) => {
    console.log("2");
    onCreate(values);
    console.log("3");
  };

  return (
    <div className="flex w-1/2 items-center justify-between rounded-md border border-neutral-300 p-4 shadow-sm">
      <Card className="w-full border-none shadow-none">
        <CardHeader className="flex flex-col items-center text-center">
          <CardTitle className="text-2xl">
            {isEditMode ? "Edit Task" : "Create a New Task"}
          </CardTitle>
          <CardDescription>
            You can view tasks only created by you.
          </CardDescription>
        </CardHeader>

        <div className="px-4">
          <DottedSeparator />
        </div>

        <CardContent className="p-4">
          <Form {...createTaskForm}>
            <form
              onSubmit={createTaskForm.handleSubmit(onSubmit)}
              className="space-y-2"
            >
              {/* Task Name */}
              <FormField
                name="title"
                control={createTaskForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="title"
                        type="text"
                        placeholder="Title"
                        disabled={isCategoriesLoading || isSubmitting}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Category */}
              <FormField
                name="category"
                control={createTaskForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        disabled={isCategoriesLoading || isSubmitting}
                        value={field.value || ""}
                        onValueChange={(value) => field.onChange(value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories?.categories?.map(
                            (category: any, index: number) => (
                              <SelectItem key={index} value={category._id}>
                                {category.name}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Status */}
              <FormField
                name="status"
                control={createTaskForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        disabled={isCategoriesLoading || isSubmitting}
                        onValueChange={(value) => field.onChange(value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(TaskStatus).map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Due Date */}
              <FormField
                name="dueDate"
                control={createTaskForm.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Due Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                            disabled={isSubmitting}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent align="start" className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      This date will be used as your Due date.
                    </FormDescription>
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                name="description"
                control={createTaskForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Description"
                        disabled={isSubmitting}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Buttons */}
              <CardFooter className="flex w-full items-center justify-end gap-6 p-0">
                <Button
                  variant="outline"
                  onClick={() => createTaskForm.reset()}
                  disabled={isSubmitting}
                  className="w-24"
                >
                  Clear
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-24 bg-amber-500 hover:bg-amber-700"
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
