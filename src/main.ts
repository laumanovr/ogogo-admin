import "reflect-metadata";
import { createApp } from "vue";
import App from "@/app/App.vue";
import router from "@/shared/router";
import pinia from "@/app/store/index";
import "./app/styles/main.scss";
import "virtual:uno.css";
import i18n from "@/shared/lib/plugins/i18n";
import { vMaska } from "maska";

const app = createApp(App);

app.use(router).use(pinia).use(i18n);

app.mount("#app");

app.directive("maska", vMaska);
