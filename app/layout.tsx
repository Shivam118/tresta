import "./globals.css";
import { Inter } from "next/font/google";
import ClientThemeProvider from "./src/components/ClientThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "To-Do App",
  description: "To-Do UI built with Next.js + MUI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientThemeProvider>{children}</ClientThemeProvider>
      </body>
    </html>
  );
}
