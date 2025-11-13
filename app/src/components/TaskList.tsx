"use client";
import React from "react";
import { Task, TaskStatus } from "../../types";
import { List, Divider } from "@mui/material";
import TaskRow from "./TaskRow";

export default function TaskList({
  tasks,
  onEdit,
  onDelete,
}: {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}) {
  if (!tasks.length) return <div style={{ padding: 12, color: "#666" }}>No tasks</div>;

  return (
    <List disablePadding>
      {tasks.map((t, i) => (
        <React.Fragment key={t.id}>
          <TaskRow task={t} onEdit={() => onEdit(t)} onDelete={() => onDelete(t.id)} />
          {<Divider sx={{ my: 1 }} />}
        </React.Fragment>
      ))}
    </List>
  );
}
