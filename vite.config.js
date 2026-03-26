import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createRequire } from "node:module";
import { fileURLToPath, URL } from "node:url";

const require = createRequire(import.meta.url);

const alias = {};
try {
    require.resolve("react-helmet-async");
} catch {
    alias["react-helmet-async"] = fileURLToPath(
        new URL("./src/shims/react-helmet-async.js", import.meta.url),
    );
}

export default defineConfig({
    plugins: [react()],
    resolve: { alias },
    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: "./vitest.setup.js",
    },
});
