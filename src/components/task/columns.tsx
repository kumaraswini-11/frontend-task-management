import { TaskStatus } from "@/lib/constants";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { SortableColumnHeader } from "../data-table";

type TaskStatusType = (typeof TaskStatus)[keyof typeof TaskStatus];

type Task = {
  id: string;
  title: string;
  category: string;
  status: TaskStatusType;
  dueDate: Date;
  createdOn: Date;
};

export const taskColumns: ColumnDef<Task>[] = [
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
        <span
          className={`py-0.2 flex w-32 min-w-[80px] items-center justify-center rounded-full px-2 text-xs shadow-inner transition-all duration-200 ease-in-out ${
            value === TaskStatus.COMPLETED
              ? "bg-green-300 text-green-900 hover:bg-green-400"
              : value === TaskStatus.IN_PROGRESS
                ? "bg-blue-100 text-blue-600 hover:bg-blue-200"
                : value === TaskStatus.PENDING
                  ? "bg-red-100 text-red-600 hover:bg-red-200"
                  : "bg-gray-100 text-gray-600"
          }`}
          role="status"
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
        </span>
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
    accessorKey: "createdOn",
    header: "Created On",
    cell: (info) => format(new Date(info.getValue() as Date), "dd MMM yyyy"),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const taskDetails = row.original;

      const handleClick = (task: Task, actionType: string) => {
        console.log("task:", task, actionType);

        // actionType.toLowerCase() === "edit"
        //   ? editTask(taskDetails)
        //   : deleteTask(taskDetails.id);
      };

      return (
        <div className="flex items-center justify-center gap-5">
          <FaEdit
            className="cursor-pointer text-[18px] text-blue-500 transition-colors duration-150 hover:text-blue-600"
            title="Edit"
            onClick={() => handleClick(taskDetails, "edit")}
          />
          <FaRegTrashAlt
            className="cursor-pointer text-[18px] text-red-500 transition-colors duration-150 hover:text-red-600"
            title="Delete"
            onClick={() => handleClick(taskDetails, "delete")}
          />
        </div>
      );
    },
  },
];
