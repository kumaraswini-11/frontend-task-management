import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";

import { TaskStatus } from "@/lib/constants";
import { TaskStatusType, TaskTable } from "@/types/task-types";

import { SortableColumnHeader } from "../data-table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Badge } from "../ui/badge";
import { useDeleteTaskMutation, useUpdateTaskMutation } from "./task-hooks";
import { TaskCreationAndUpdateForm } from "./task-create-update-form";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

export const taskColumns: ColumnDef<TaskTable>[] = [
  {
    accessorKey: "title",
    header: "Task Title",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <SortableColumnHeader column={column} label="Category" />
    ),
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <SortableColumnHeader column={column} label="Status" />
    ),
    cell: (info) => {
      const value = info.getValue() as TaskStatusType;

      return (
        <Badge
          variant="secondary"
          className={`py-0.2 flex w-24 min-w-[80px] items-center justify-center rounded-full text-xs ${
            value === TaskStatus.COMPLETED
              ? "bg-green-300 text-green-900 hover:bg-green-400"
              : value === TaskStatus.IN_PROGRESS
                ? "bg-blue-100 text-blue-600 hover:bg-blue-200"
                : value === TaskStatus.PENDING
                  ? "bg-red-100 text-red-600 hover:bg-red-200"
                  : "bg-gray-100 text-gray-600"
          }`}
          aria-label={
            value === TaskStatus.COMPLETED
              ? "Task completed"
              : value === TaskStatus.IN_PROGRESS
                ? "Task in progress"
                : value === TaskStatus.PENDING
                  ? "Task pending"
                  : "Task status unknown"
          }
        >
          {value.replace("-", " ")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => (
      <SortableColumnHeader column={column} label="Due Date" />
    ),
    cell: (info) => format(new Date(info.getValue() as Date), "dd MMM yyyy"),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: (info) => format(new Date(info.getValue() as Date), "dd MMM yyyy"),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const taskDetails = row.original;

      const [isEditMode, setIsEditMode] = useState(false);
      const [selectedTask, setSelectedTask] = useState<TaskTable | null>(null);

      const { mutate: updateTask } = useUpdateTaskMutation();
      const { mutate: deleteTask } = useDeleteTaskMutation();

      const handleEditClick = (task: TaskTable) => {
        const formattedTask = {
          ...task,
          dueDate: task.dueDate ? new Date(task.dueDate) : new Date(),
          status: task.status as TaskStatusType,
        };

        setSelectedTask(formattedTask);
        setIsEditMode(true);
      };

      const handleDeleteClick = (taskId: string) => {
        if (!taskId) {
          console.error("Task ID is undefined, cannot delete task.");
          return;
        }

        deleteTask(taskId);
      };

      return (
        <div className="flex items-center justify-center gap-5">
          {/* Edit Form Modal */}
          <Dialog>
            <DialogTrigger asChild>
              <FaEdit
                className="cursor-pointer text-[18px] text-blue-500 transition-colors duration-150 hover:text-blue-600"
                title="Edit"
                onClick={() => handleEditClick(taskDetails)}
              />
            </DialogTrigger>
            <DialogContent>
              {isEditMode && selectedTask && (
                <TaskCreationAndUpdateForm
                  isEditMode={true}
                  initialValues={selectedTask}
                  onUpdate={(updatedTask) => {
                    updateTask({ taskDetails: updatedTask });
                    setIsEditMode(false);
                  }}
                />
              )}
            </DialogContent>
          </Dialog>

          {/* Delete confirmation dialog */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <FaRegTrashAlt
                className="cursor-pointer text-[18px] text-red-500 transition-colors duration-150 hover:text-red-600"
                title="Delete"
              />
            </AlertDialogTrigger>
            <AlertDialogContent className="sm:max-w-md">
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to delete?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleDeleteClick(taskDetails?._id as string)}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];
