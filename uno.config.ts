import { defineConfig } from "unocss";
import config from "./node_modules/ogogo-uikit/uno.config";

console.log(config);

export default defineConfig({
  presets: [],
  rules: [...config.rules],
});
