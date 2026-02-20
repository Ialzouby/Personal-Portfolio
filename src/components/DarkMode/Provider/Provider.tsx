"use client";
import { ThemeProvider } from "next-themes";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem={false} forcedTheme="light">
      {children}
    </ThemeProvider>
  );
};

export default Provider;
