import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/ckan-api": {
        target: "https://localhost:8443",
        changeOrigin: true,
        secure: false, // allow local self-signed cert
        rewrite: (path) => path.replace(/^\/ckan-api/, ""),
      },
    },
  },
});
