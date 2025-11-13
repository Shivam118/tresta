"use client";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import React from "react";

const theme = createTheme({
  palette: { primary: { main: "#034EA2" }, background: { default: "#f5f6f7" } },
  typography: { fontFamily: "Inter, Arial, sans-serif" },
});

export default function ClientThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
