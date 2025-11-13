"use client";

import React, { useState } from "react";
import { Box, Container } from "@mui/material";
import { Task } from "../../types";
import Dashboard from "./Dashboard";
import AddTaskScreen from "./AddTaskScreen";
import EditTaskScreen from "./EditTaskScreen";

type View = "dashboard" | "add" | "edit";

export default function TaskApp() {
  const [tasks, setTasks] = useState<Task[]>(() => [
    {
      id: "t1",
      title: "Design Homepage UI",
      description: "Finish the homepage Figma layout and get approval.",
      date: "2025-11-15",
      status: "in-progress",
      createdAt: Date.now(),
    },
    {
      id: "t2",
      title: "Order Fabric Samples",
      description: "Get rayon and cotton samples from supplier.",
      date: "2025-11-18",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      id: "t3",
      title: "Upload Product Photos",
      description: "Shoot and upload the new night suit designs.",
      date: "2025-11-12",
      status: "completed",
      createdAt: Date.now(),
    },
  ]);

  const [view, setView] = useState<View>("dashboard");
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const handleAdd = (task: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      ...task,
      id: String(Date.now()) + Math.random().toString(36).slice(2, 6),
      createdAt: Date.now(),
    };
    setTasks((prev) => [newTask, ...prev]);
    setView("dashboard");
  };

  const handleEditSave = (patch: Partial<Task>) => {
    if (activeTask) {
      setTasks((prev) =>
        prev.map((t) => (t.id === activeTask.id ? { ...t, ...patch } : t))
      );
      setActiveTask(null);
    }
    setView("dashboard");
  };

  const handleDelete = (id: string) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));

  return (
    <Box>
      {view === "dashboard" && (
        <Dashboard
          tasks={tasks}
          onAdd={() => setView("add")}
          onEdit={(task) => {
            setActiveTask(task);
            setView("edit");
          }}
          onDelete={handleDelete}
        />
      )}

      {view === "add" && (
        <AddTaskScreen onBack={() => setView("dashboard")} onSave={handleAdd} />
      )}

      {view === "edit" && activeTask && (
        <EditTaskScreen
          task={activeTask}
          onBack={() => setView("dashboard")}
          onSave={handleEditSave}
        />
      )}
    </Box>
  );
}
