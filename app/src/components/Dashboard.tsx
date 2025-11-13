"use client";

import {
  Box,
  Fab,
  Stack,
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  InputAdornment,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import TaskList from "./TaskList";
import { Task, TaskStatus } from "../../types";
import { useMemo, useState } from "react";

export default function Dashboard({
  tasks,
  onAdd,
  onEdit,
  onDelete,
}: {
  tasks: Task[];
  onAdd: () => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}) {
  const [query, setQuery] = useState("");

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



  return (
    <Paper elevation={0}>
      <Box sx={{ bgcolor: "primary.main", py: 2, px: 3 }}>
        <Typography variant="h6" sx={{ color: "white", fontWeight: 700 }}>
          TO-DO APP
        </Typography>
      </Box>


      <Stack spacing={2} p={5}>
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
        {(["in-progress", "pending", "completed"] as const).map((status) => (
          <Accordion key={status} defaultExpanded disableGutters
            elevation={0}
            sx={{
              bgcolor: "#F3F6F9",
              borderRadius: 1,
              "&:before": { display: "none" },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                <Typography sx={{ fontWeight: 500 }}>{status === "in-progress"
                  ? "In Progress"
                  : status.charAt(0).toUpperCase() + status.slice(1)} <Box component="span" sx={{ color: "text.secondary" }}>({grouped[status].length})</Box></Typography>
                {/* right side empty to keep spacing like Figma */}
              </Box>
            </AccordionSummary>
            <AccordionDetails style={{ background: "#fff" }}>
              <TaskList
                tasks={grouped[status]}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>

      <Fab
        color="primary"
        sx={{ position: "fixed", bottom: 28, right: 28 }}
        onClick={onAdd}
      >
        <AddIcon />
      </Fab>
    </Paper>
  );
}
