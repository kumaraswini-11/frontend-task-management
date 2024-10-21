import { TaskStatus } from "@/lib/constants";
import { z } from "zod";

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
