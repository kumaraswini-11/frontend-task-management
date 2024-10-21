import { TaskStatus } from "@/lib/constants";

export type Task = {
  title: string;
  description?: string;
  status: TaskStatusType;
  dueDate: Date;
  category: string;
};

export type TaskTable = {
  id: string;
  title: string;
  category: string;
  status: TaskStatusType;
  dueDate: Date;
  createdOn: Date;
  description?: string;
};

export type TaskStatusType = (typeof TaskStatus)[keyof typeof TaskStatus];

export type CreationAndUpdateTaskFormProps = {
  onCancel: () => void;
  onCreate: (newTask: Task) => void;
  isEditMode: boolean;
  initialValues: Task | null;
};
