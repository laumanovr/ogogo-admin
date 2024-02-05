import { createApp } from "vue";
import App from "@/app/App.vue";
import router from "./app/router";
import "./app/style/main.scss";

createApp(App).use(router).mount("#app");
