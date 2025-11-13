export type TaskStatus = "in-progress" | "pending" | "completed";

export type Task = {
  id: string;
  title: string;
  description?: string;
  date?: string; // ISO or formatted
  status: TaskStatus;
  createdAt: number;
};
