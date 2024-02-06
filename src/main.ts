import { createApp } from "vue";
import App from "@/app/App.vue";
import router from "./app/router";
import "./app/style/main.scss";
import { SButton } from "@tumarsoft/ogogo-ui";

const app = createApp(App);

app.component("OBtn", SButton);
app.use(router);

app.mount("#app");
