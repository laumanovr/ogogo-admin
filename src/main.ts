import { createApp } from "vue";
import App from "@/app/App.vue";
import router from "./app/router";
import "./app/style/main.scss";

const app = createApp(App);

app.use(router);

app.mount("#app");
