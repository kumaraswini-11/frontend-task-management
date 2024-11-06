import { TaskStatus } from "@/lib/constants";

export type Task = {
  _id?: string;
  title: string;
  description?: string;
  status: TaskStatusType;
  dueDate: Date;
  category: string;
};

export type TaskTable = {
  _id?: string;
  title: string;
  category: string;
  status: TaskStatusType;
  dueDate: Date;
  createdAt?: Date;
  description?: string;
};

export type TaskStatusType = (typeof TaskStatus)[keyof typeof TaskStatus];

export type CreationAndUpdateTaskFormProps = {
  onCancel?: () => void;
  onCreate?: (newTask: Task) => void;
  onUpdate?: (newTask: TaskTable) => void;
  isEditMode: boolean;
  initialValues: Task | null;
};
