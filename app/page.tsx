"use client";
import dynamic from "next/dynamic";
import Box from "@mui/material/Box";

const TaskApp = dynamic(() => import("./src/components/TaskApp"), { ssr: false });

export default function Page() {
  return (
    <Box sx={{ bgcolor: "background.default" }}>
      <TaskApp />
    </Box>
  );
}
