"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Task, TaskStatus } from "../../types";

export default function EditTaskScreen({
  task,
  onBack,
  onSave,
}: {
  task: Task;
  onBack: () => void;
  onSave: (patch: Partial<Task>) => void;
}) {
  const [form, setForm] = useState({
    title: task.title,
    description: task.description || "",
    date: task.date || "",
    status: task.status,
  });

  const handleChange = (key: string, value: any) =>
    setForm((s) => ({ ...s, [key]: value }));

  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={0} mb={3} sx={{ bgcolor: "primary.main", py: 2, px: 3 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={onBack} sx={{ color: "#fff" }} />
        <Typography variant="h6" sx={{ color: "white", fontWeight: 700 }}>
          Edit Task
        </Typography>
      </Stack>

      <Stack spacing={2} p={5}>
        <TextField
          label="Title"
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
          fullWidth
        />
        <TextField
          label="Description"
          multiline
          minRows={3}
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
          fullWidth
        />
        <TextField
          select
          label="Status"
          value={form.status}
          onChange={(e) => handleChange("status", e.target.value as TaskStatus)}
        >
          <MenuItem value="pending">
            <Stack direction="row" alignItems="center" spacing={1}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: "#9e9e9e",
                }}
              />
              <Typography
                variant="body2"
                sx={{ fontWeight: 500, textTransform: "capitalize" }}
              >
                Pending
              </Typography>
            </Stack>
          </MenuItem>
          <MenuItem value="in-progress">
            <Stack direction="row" alignItems="center" spacing={1}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: "#ed6c02",
                }}
              />
              <Typography
                variant="body2"
                sx={{ fontWeight: 500, textTransform: "capitalize" }}
              >
                In Progress
              </Typography>
            </Stack>
          </MenuItem>
          <MenuItem value="completed">
            <Stack direction="row" alignItems="center" spacing={1}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: "#2e7d32",
                }}
              />
              <Typography
                variant="body2"
                sx={{ fontWeight: 500, textTransform: "capitalize" }}
              >
                Completed
              </Typography>
            </Stack>
          </MenuItem>
        </TextField>
      </Stack>

      <Stack direction="row" sx={{
        justifyContent: "space-between",
        alignItems: "center",
      }} mt={4} spacing={2} px={5}>
        <Button sx={{ py: 2, px: 5 }} variant="outlined" onClick={onBack}>
          Cancel
        </Button>
        <Button sx={{ py: 2, px: 5 }} variant="contained" onClick={() => onSave(form)}>
          Update
        </Button>
      </Stack>

    </Box>
  );
}
