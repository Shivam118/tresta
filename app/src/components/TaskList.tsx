"use client";
import React from "react";
import { Task, TaskStatus } from "../../types";
import { List, Divider } from "@mui/material";
import TaskRow from "./TaskRow";

export default function TaskList({
  tasks,
  onEdit,
  onDelete,
  onChangeStatus,
}: {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onChangeStatus: (id: string, status: TaskStatus) => void;
}) {
  if (!tasks.length) return <div style={{ padding: 12, color: "#666" }}>No tasks</div>;

  return (
    <List disablePadding>
      {tasks.map((t, i) => (
        <React.Fragment key={t.id}>
          <TaskRow task={t} onEdit={() => onEdit(t)} onDelete={() => onDelete(t.id)} onChangeStatus={(s) => onChangeStatus(t.id, s)} />
          {<Divider sx={{ my: 1 }} />}
        </React.Fragment>
      ))}
    </List>
  );
}
