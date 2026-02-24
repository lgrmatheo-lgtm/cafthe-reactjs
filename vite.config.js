import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createRequire } from "node:module";
import { fileURLToPath, URL } from "node:url";

const require = createRequire(import.meta.url);

// Fallback dev: si react-helmet-async n'est pas installe, on mappe vers un shim local.
// Des que le package existe dans node_modules, Vite utilise automatiquement la vraie lib.
const alias = {};
try {
    require.resolve("react-helmet-async");
} catch {
    alias["react-helmet-async"] = fileURLToPath(
        new URL("./src/shims/react-helmet-async.js", import.meta.url),
    );
}

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: { alias },
});
