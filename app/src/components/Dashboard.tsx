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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TaskList from "./TaskList";
import { Task } from "../../types";

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
  const grouped = {
    "in-progress": tasks.filter((t) => t.status === "in-progress"),
    pending: tasks.filter((t) => t.status === "pending"),
    completed: tasks.filter((t) => t.status === "completed"),
  };

  return (
    <Paper elevation={0}>
      <Box sx={{ bgcolor: "primary.main", py: 2, px: 3 }}>
        <Typography variant="h6" sx={{ color: "white", fontWeight: 700 }}>
          TO-DO APP
        </Typography>
      </Box>

      <Stack spacing={2} p={5}>
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
                onChangeStatus={() => { }}
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
