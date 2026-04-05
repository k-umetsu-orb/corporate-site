import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root")!;

// Pre-rendered HTML (SSG) が存在する場合は hydrateRoot で再利用、
// それ以外は通常の createRoot でマウント
if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, <App />);
} else {
  createRoot(rootElement).render(<App />);
}
