import { createApp } from "vue";
import App from "@/app/App.vue";
import router from "./app/router";
import pinia from "@/app/store/index";
import "./app/style/main.scss";
import interceptors from "@/shared/plugins/axios";

interceptors();

const app = createApp(App);

app.use(router).use(pinia);

app.mount("#app");
