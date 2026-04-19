import path from "path";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, import.meta.dirname);
  const port = 5173;
  return {
    build: { outDir: "internal/resources/vite/build" },
    clearScreen: false,
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "src"),
      },
    },
    server: {
      port,
      origin: `http://localhost:${port}`,
      proxy: { "/api": { target: env.VITE_API_URL, changeOrigin: true } },
    },
  };
});
