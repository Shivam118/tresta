"use client";

import React from "react";
import {
  Avatar,
  Box,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Task, TaskStatus } from "../../types";

// Define color + label mapping
const statusStyles = (status: TaskStatus) => {
  switch (status) {
    case "in-progress":
      return { color: "#ed6c02", label: "In Progress" }; // orange
    case "pending":
      return { color: "#9e9e9e", label: "Pending" }; // gray
    case "completed":
      return { color: "#2e7d32", label: "Completed" }; // green
    default:
      return { color: "#9e9e9e", label: "Pending" };
  }
};

export default function TaskRow({
  task,
  onEdit,
  onDelete,
}: {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const { color, label } = statusStyles(task.status);
  const initials = task.title ? task.title.charAt(0).toUpperCase() : "?";

  return (
    <ListItem
      alignItems="flex-start"
      sx={{
        p: 1.5,
        position: "relative",
        cursor: "pointer",
        flexWrap: "wrap",
        "&:hover": {
          backgroundColor: "rgba(0,0,0,0.02)",
        },
        "&:hover .actions": {
          opacity: 1,
          visibility: "visible",
          transform: "translateY(0)",
        },
      }}
    >
      <ListItemAvatar>
        <Avatar
          sx={{
            bgcolor: "white",
            color: "primary.main",
            border: "2px solid",
            borderColor: "primary.main",
            width: 48,
            height: 48,
            fontWeight: 600,
          }}
        >
          {initials}
        </Avatar>
      </ListItemAvatar>

      <ListItemText
        primary={
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1,
              mb: 0.5,
            }}
          >
            <Typography sx={{ fontWeight: 700, color: "primary.main" }}>
              {task.title}
            </Typography>

            {/* Status dot + label */}
            <Stack direction="row" alignItems="center" spacing={1}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: color,
                }}
              />
              <Typography
                variant="body2"
                sx={{ fontWeight: 500, textTransform: "capitalize" }}
              >
                {label}
              </Typography>
            </Stack>
          </Box>
        }
        secondary={
          <Box sx={{ mt: 0.5 }}>
            <Typography sx={{ color: "text.primary" }} className="text-sm md:text-base">
              {task.description}
            </Typography>
            {task.date && (
              <Typography sx={{ color: "text.secondary", mt: 0.5 }}>
                {new Date(task.date).toLocaleDateString("en-US", {
                  weekday: "short",
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </Typography>
            )}
          </Box>
        }
      />

      {/* Hidden edit/delete actions on hover */}
      <Stack
        direction="row"
        spacing={0.5}
        className="actions"
        sx={{
          position: "absolute",
          right: 12,
          top: "50%",
          transform: "translateY(-50%)",
          opacity: 0,
          visibility: "hidden",
          transition: "all 0.25s ease",
        }}
      >
        <Tooltip title="Edit">
          <IconButton size="small" onClick={onEdit} color="primary">
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton size="small" onClick={onDelete} color="error">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>
    </ListItem>
  );
}
