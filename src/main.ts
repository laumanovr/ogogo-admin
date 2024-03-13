import "reflect-metadata";
import { createApp } from "vue";
import App from "@/app/App.vue";
import router from "@/shared/router";
import pinia from "@/app/store/index";
import "./app/style/main.scss";
import "virtual:uno.css";
import i18n from "@/shared/lib/plugins/i18n";
import { RouteLocationNormalized } from "vue-router";
import { getItem } from "./shared/lib/utils/persistanceStorage";
import { vMaska } from "maska";

router.beforeEach(
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: Function
  ) => {
    const isAuthenticated = Boolean(getItem("sessionId")),
      requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    // roleScreensObj = getItem("auth")?.roleScreensObj ?? null,
    // currentMenu = getItem("auth")?.uiElements ?? [];

    if (!isAuthenticated) {
      if (requiresAuth) {
        return next("/");
      }
      next();
    } else {
      if (to.path === "/" && !isAuthenticated) {
        next();
      } else {
        next();
      }
    }
  }
);

const app = createApp(App);

app.use(router).use(pinia).use(i18n);

app.mount("#app");

app.directive("maska", vMaska);
