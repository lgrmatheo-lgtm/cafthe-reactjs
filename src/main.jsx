import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";
import "./styles/global.css";
import "./styles/theme.css";

const THEME_STORAGE_KEY = "cafthe_theme";
const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
const initialTheme =
    storedTheme === "light" || storedTheme === "dark"
        ? storedTheme
        : window.matchMedia?.("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";

document.documentElement.setAttribute("data-theme", initialTheme);
document.documentElement.style.colorScheme = initialTheme;

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <HelmetProvider>
            <App />
        </HelmetProvider>
    </StrictMode>,
);
