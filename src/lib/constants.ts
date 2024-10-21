export const baseUrl = `${import.meta.env.VITE_BACKEND_BASE_URL}/api`;

export const TaskStatus = {
  PENDING: "pending",
  IN_PROGRESS: "in-progress",
  COMPLETED: "completed",
} as const;

// Sample Data
export const tasks = [
  {
    id: "1",
    title: "Complete project proposal",
    status: TaskStatus.IN_PROGRESS,
    dueDate: new Date(2024, 9, 21),
    category: "Work",
    createdOn: new Date(2024, 8, 12),
  },
  {
    id: "2",
    title: "Buy groceries",
    status: TaskStatus.PENDING,
    dueDate: new Date(2024, 9, 19),
    category: "Personal",
    createdOn: new Date(2024, 8, 10),
  },
  {
    id: "3",
    title: "Review team performance",
    status: TaskStatus.COMPLETED,
    dueDate: new Date(2024, 9, 18),
    category: "Work",
    createdOn: new Date(2024, 8, 15),
  },
  {
    id: "4",
    title: "Review team performance",
    status: TaskStatus.COMPLETED,
    dueDate: new Date(2024, 9, 18),
    category: "Work",
    createdOn: new Date(2024, 8, 15),
  },
  {
    id: "5",
    title: "Review team performance",
    status: TaskStatus.COMPLETED,
    dueDate: new Date(2024, 9, 18),
    category: "Work",
    createdOn: new Date(2024, 8, 15),
  },
  {
    id: "6",
    title: "Review team performance",
    status: TaskStatus.COMPLETED,
    dueDate: new Date(2024, 9, 18),
    category: "Work",
    createdOn: new Date(2024, 8, 15),
  },
  {
    id: "7",
    title: "Review team performance",
    status: TaskStatus.COMPLETED,
    dueDate: new Date(2024, 9, 18),
    category: "Work",
    createdOn: new Date(2024, 8, 15),
  },
  {
    id: "8",
    title: "Review team performance",
    status: TaskStatus.COMPLETED,
    dueDate: new Date(2024, 9, 18),
    category: "Work",
    createdOn: new Date(2024, 8, 15),
  },
  {
    id: "9",
    title: "Review team performance",
    status: TaskStatus.COMPLETED,
    dueDate: new Date(2024, 9, 18),
    category: "Work",
    createdOn: new Date(2024, 8, 15),
  },
  {
    id: "10",
    title: "Review team performance",
    status: TaskStatus.COMPLETED,
    dueDate: new Date(2024, 9, 18),
    category: "Work",
    createdOn: new Date(2024, 8, 15),
  },
  {
    id: "11",
    title: "Review team performance",
    status: TaskStatus.COMPLETED,
    dueDate: new Date(2024, 9, 18),
    category: "Work",
    createdOn: new Date(2024, 8, 15),
  },
];

export const categories = [
  {
    name: "Work",
    userId: "60d21b4667d0d8992e610c85",
    createdAt: "2023-10-01T12:00:00Z",
    updatedAt: "2023-10-01T12:00:00Z",
  },
  {
    name: "Personal",
    userId: "60d21b4667d0d8992e610c86",
    createdAt: "2023-10-02T12:00:00Z",
    updatedAt: "2023-10-02T12:00:00Z",
  },
  {
    name: "Shopping",
    userId: "60d21b4667d0d8992e610c87",
    createdAt: "2023-10-03T12:00:00Z",
    updatedAt: "2023-10-03T12:00:00Z",
  },
  {
    name: "Fitness",
    userId: "60d21b4667d0d8992e610c88",
    createdAt: "2023-10-04T12:00:00Z",
    updatedAt: "2023-10-04T12:00:00Z",
  },
  {
    name: "Travel",
    userId: "60d21b4667d0d8992e610c89",
    createdAt: "2023-10-05T12:00:00Z",
    updatedAt: "2023-10-05T12:00:00Z",
  },
];
