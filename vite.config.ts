import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";
import UnoCSS from "unocss/vite";
// import config from "./node_modules/ogogo-uikit/uno.config";

// console.log(config);

// console.log("emir");
// function emirius() {
//   console.log(config);

//   console.log("emir");
// }

// emirius();
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), UnoCSS()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  // define: {
  //   "process.env": process.env,
  // },
  // define: { "process.env": {} },
});
