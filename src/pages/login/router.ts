import { Routes } from "@/shared/router/index.type";
import { RouteRecordRaw } from "vue-router";
import { guestMiddleware } from "@/shared/router";
import { compose } from "ramda";

const routes: RouteRecordRaw[] = [
  {
    path: Routes.login,
    name: "login",
    component: () => import(`../login/ui/Login.vue`),
    beforeEnter(to, from, next) {
      compose(guestMiddleware)(to, from, next);
    },
  },
];

export default routes;
