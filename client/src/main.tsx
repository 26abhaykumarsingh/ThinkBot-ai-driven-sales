import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@/components/theme-provider";
import App from "./App";
import "./index.css";

// Create root element and render app with providers
createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    <App />
  </ThemeProvider>
);
