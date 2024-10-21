import { z } from "zod";

import { TaskStatus } from "@/lib/constants";

export const TaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum([
    TaskStatus.PENDING,
    TaskStatus.IN_PROGRESS,
    TaskStatus.COMPLETED,
  ]),
  dueDate: z.date(),
  category: z.string(),
});
