import "reflect-metadata";
import { createApp } from "vue";
import App from "@/app/App.vue";
import router from "./app/router";
import pinia from "@/app/store/index";
import "./app/style/main.scss";
import "virtual:uno.css";
import i18n from "@/shared/lib/plugins/i18n";

const app = createApp(App);

app.use(router).use(pinia).use(i18n);

app.mount("#app");
