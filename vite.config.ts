import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";

const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  define: {
    "process.env": process.env,
  },
  // define: { "process.env": {} },
});
