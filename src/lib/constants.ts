export const baseUrl = `${import.meta.env.VITE_BACKEND_BASE_URL}/api`;

export const TaskStatus = {
  PENDING: "pending",
  IN_PROGRESS: "in-progress",
  COMPLETED: "completed",
} as const;

export const LandingPageDetails = [
  {
    path: "/tasks",
    heading: "Task Dashboard",
    description: "Monitor all of your tasks here.",
  },
  {
    path: "/categories",
    heading: "Category Dashboard",
    description: "Monitor all of your categories here.",
  },
] as const;

// Sample Data
export const tasks = [
  {
    _id: "1",
    title: "Complete project proposal",
    status: TaskStatus.IN_PROGRESS,
    dueDate: new Date(2024, 9, 21),
    category: "Work",
    createdAt: new Date(2024, 8, 12),
  },
  {
    _id: "2",
    title: "Buy groceries",
    status: TaskStatus.PENDING,
    dueDate: new Date(2024, 9, 19),
    category: "Personal",
    createdAt: new Date(2024, 8, 10),
  },
  {
    _id: "3",
    title: "Review team performance",
    status: TaskStatus.COMPLETED,
    dueDate: new Date(2024, 9, 18),
    category: "Work",
    createdAt: new Date(2024, 8, 15),
  },
  {
    _id: "4",
    title: "Review team performance",
    status: TaskStatus.COMPLETED,
    dueDate: new Date(2024, 9, 18),
    category: "Work",
    createdAt: new Date(2024, 8, 15),
  },
  {
    _id: "5",
    title: "Review team performance",
    status: TaskStatus.COMPLETED,
    dueDate: new Date(2024, 9, 18),
    category: "Work",
    createdAt: new Date(2024, 8, 15),
  },
  {
    _id: "6",
    title: "Review team performance",
    status: TaskStatus.COMPLETED,
    dueDate: new Date(2024, 9, 18),
    category: "Work",
    createdAt: new Date(2024, 8, 15),
  },
  {
    _id: "7",
    title: "Review team performance",
    status: TaskStatus.COMPLETED,
    dueDate: new Date(2024, 9, 18),
    category: "Work",
    createdAt: new Date(2024, 8, 15),
  },
  {
    _id: "8",
    title: "Review team performance",
    status: TaskStatus.COMPLETED,
    dueDate: new Date(2024, 9, 18),
    category: "Work",
    createdAt: new Date(2024, 8, 15),
  },
  {
    _id: "9",
    title: "Review team performance",
    status: TaskStatus.COMPLETED,
    dueDate: new Date(2024, 9, 18),
    category: "Work",
    createdAt: new Date(2024, 8, 15),
  },
  {
    _id: "10",
    title: "Review team performance",
    status: TaskStatus.COMPLETED,
    dueDate: new Date(2024, 9, 18),
    category: "Work",
    createdAt: new Date(2024, 8, 15),
  },
  {
    _id: "11",
    title: "Review team performance",
    status: TaskStatus.COMPLETED,
    dueDate: new Date(2024, 9, 18),
    category: "Work",
    createdAt: new Date(2024, 8, 15),
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
