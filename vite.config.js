import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./", // important for Netlify or GitHub Pages
  build: {
    outDir: "dist"
  }
});
