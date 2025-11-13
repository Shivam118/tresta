"use client";

import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { TaskStatus } from "../../types";

export default function AddTaskScreen({
  onBack,
  onSave,
}: {
  onBack: () => void;
  onSave: (task: Omit<any, "id" | "createdAt">) => void;
}) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    status: "pending" as TaskStatus,
  });


  const handleChange = (key: string, value: any) =>
    setForm((s) => ({ ...s, [key]: value }));

  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={0} mb={3} sx={{ bgcolor: "primary.main", py: 2, px: 3 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={onBack} sx={{ color: "#fff" }} />
        <Typography variant="h6" sx={{ color: "white", fontWeight: 700 }}>
          Add Task
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
      </Stack>

      <Stack direction="row" sx={{
        justifyContent: "space-between",
        alignItems: "center",
      }} mt={4} spacing={2} px={5}>
        <Button sx={{ py: 2, px: 5 }} variant="outlined" onClick={onBack}>
          Cancel
        </Button>
        <Button
          sx={{ py: 2, px: 5 }} variant="contained"
          onClick={() => onSave(form)}
          disabled={!form.title.trim()}
        >
          Add
        </Button>
      </Stack>
    </Box>
  );
}
