import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import CreatorWidgetLab from "./components/CreatorWidgetLab";
import "./index.css";

const isWidgetLab = window.location.pathname.replace(/\/$/, "") === "/creator-widgets";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {isWidgetLab ? <CreatorWidgetLab /> : <App />}
  </StrictMode>
);
