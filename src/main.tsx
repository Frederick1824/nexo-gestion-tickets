import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "./store";
import App from "./App";
import "./styles.css";
import "./institutional.css";
import "./network.css";
import "./communications.css";
import "./theme.css";
import { ThemeProvider } from "./theme";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <StoreProvider>
          <App />
        </StoreProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
