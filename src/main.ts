import { createApp } from "vue";
import App from "@/app/App.vue";
import router from "./app/router";
import "./app/style/main.scss";
import { SButton } from "@tumarsoft/ogogo-ui";
import "@tumarsoft/ogogo-ui/styles"

const app = createApp(App);

app.component("OBtn", SButton);
app.use(router);

app.mount("#app");
