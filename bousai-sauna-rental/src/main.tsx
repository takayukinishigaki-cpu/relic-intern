import { createRoot } from "react-dom/client";

import App from "@/App";
import "@/index.css";

// page_view の二重計測を避けるため StrictMode は使わない
createRoot(document.getElementById("root")!).render(<App />);
