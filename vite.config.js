import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";
import path from "path";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "automatic",
    }),
  ],
  base: "https://slinkter.github.io/myprojectapi11",
  server: {
    proxy: {
      "/api/cors-proxy": {
        target: "https://cdn2.thecatapi.com",
        changeOrigin: true,
        rewrite: (path) => decodeURIComponent(path.replace(/^\/api\/cors-proxy\?url=/, "")),
      },
    },
  },
  resolve: {
    alias: {
      "@features": path.resolve(__dirname, "./src/features"),
      "@shared": path.resolve(__dirname, "./src/shared"),
      "@app": path.resolve(__dirname, "./src/app"),
      "@config": path.resolve(__dirname, "./src/config"),
      "@widgets": path.resolve(__dirname, "./src/widgets"),
    },
  },
});
