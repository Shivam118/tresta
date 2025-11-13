"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Paper,
  Stack,
  TextField,
  InputAdornment,
  Typography,
  Fab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { Task, TaskStatus } from "../types";
import CategoryAccordion from "./ui/CategoryAccordion";
import TaskList from "./ui/TaskList";
import AddEditDialog from "./ui/AddEditDialog";
import ConfirmDialog from "./ui/ConfirmDialog";

const STORAGE_KEY = "mui_todo_tasks_v1";

const sampleTasks = (): Task[] => [
  {
    id: "t1",
    title: "Lorem Ipsum",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    date: "2024-07-31",
    status: "in-progress",
    createdAt: Date.now() - 1000 * 60 * 60 * 24,
  },
  {
    id: "t2",
    title: "Lorem Ipsum 2",
    description: "Second In-progress example item.",
    date: "2024-07-30",
    status: "in-progress",
    createdAt: Date.now() - 1000 * 60 * 60 * 48,
  },
  {
    id: "t3",
    title: "Pending item",
    description: "Waiting for review",
    date: "2024-08-05",
    status: "pending",
    createdAt: Date.now() - 1000 * 60 * 60 * 72,
  },
  {
    id: "t4",
    title: "Completed task",
    description: "Already finished",
    date: "2024-06-11",
    status: "completed",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 10,
  },
];

export default function TaskApp() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window === "undefined") return sampleTasks();
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : sampleTasks();
    } catch {
      return sampleTasks();
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {}
  }, [tasks]);

  const [query, setQuery] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [editing, setEditing] = useState<Task | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // search filter
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return tasks;
    return tasks.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        (t.description || "").toLowerCase().includes(q)
    );
  }, [tasks, query]);

  const grouped = useMemo(() => {
    const g: Record<TaskStatus, Task[]> = {
      "in-progress": [],
      pending: [],
      completed: [],
    };
    filtered.forEach((t) => g[t.status].push(t));
    return g;
  }, [filtered]);

  const addTask = (payload: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      ...payload,
      id: String(Date.now()) + Math.random().toString(36).slice(2, 6),
      createdAt: Date.now(),
    };
    setTasks((s) => [newTask, ...s]);
  };

  const updateTask = (id: string, patch: Partial<Task>) =>
    setTasks((s) => s.map((t) => (t.id === id ? { ...t, ...patch } : t)));

  const deleteTask = (id: string) => setTasks((s) => s.filter((t) => t.id !== id));

  return (
    <Container maxWidth="sm">
      <Paper elevation={0} sx={{ bgcolor: "white", borderRadius: 0 }}>
        {/* header blue bar */}
        <Box sx={{ bgcolor: "primary.main", py: 3, px: 3 }}>
          <Typography variant="h6" sx={{ color: "white", fontWeight: 700 }}>
            TO-DO APP
          </Typography>
        </Box>

        <Box sx={{ p: 3 }}>
          <TextField
            fullWidth
            placeholder="Search To-Do"
            variant="outlined"
            size="medium"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />

          <Stack spacing={2}>
            <CategoryAccordion
              title="In Progress"
              count={grouped["in-progress"].length}
              defaultExpanded
            >
              <TaskList
                tasks={grouped["in-progress"]}
                onEdit={(t) => setEditing(t)}
                onDelete={(id) => setDeletingId(id)}
                onChangeStatus={(id, status) => updateTask(id, { status })}
              />
            </CategoryAccordion>

            <CategoryAccordion title="Pending" count={grouped["pending"].length}>
              <TaskList
                tasks={grouped["pending"]}
                onEdit={(t) => setEditing(t)}
                onDelete={(id) => setDeletingId(id)}
                onChangeStatus={(id, status) => updateTask(id, { status })}
              />
            </CategoryAccordion>

            <CategoryAccordion title="Completed" count={grouped["completed"].length}>
              <TaskList
                tasks={grouped["completed"]}
                onEdit={(t) => setEditing(t)}
                onDelete={(id) => setDeletingId(id)}
                onChangeStatus={(id, status) => updateTask(id, { status })}
              />
            </CategoryAccordion>
          </Stack>
        </Box>
      </Paper>

      {/* Floating Add button (bottom right like design) */}
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => setAddOpen(true)}
        sx={{ position: "fixed", right: 28, bottom: 28 }}
      >
        <AddIcon />
      </Fab>

      {/* Add dialog */}
      <AddEditDialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSave={(p) => {
          addTask(p);
          setAddOpen(false);
        }}
        title="Add Task"
        initial={undefined}
      />

      {/* Edit dialog */}
      <AddEditDialog
        open={!!editing}
        onClose={() => setEditing(null)}
        onSave={(p) => {
          if (!editing) return;
          updateTask(editing.id, p);
          setEditing(null);
        }}
        title="Edit Task"
        initial={editing ?? undefined}
      />

      {/* Delete confirm */}
      <ConfirmDialog
        open={!!deletingId}
        onClose={() => setDeletingId(null)}
        title="Delete Task"
        content="Are you sure you want to delete this task?"
        onConfirm={() => {
          if (deletingId) deleteTask(deletingId);
          setDeletingId(null);
        }}
      />
    </Container>
  );
}
