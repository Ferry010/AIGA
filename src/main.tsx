import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

console.info("deploy-marker: 2026-03-27T00:00Z");

createRoot(document.getElementById("root")!).render(<App />);
