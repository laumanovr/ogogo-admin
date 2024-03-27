import { Routes } from "@/shared/router/index.type";
import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: Routes.login,
    name: "login",
    component: () => import("../ui/login/Login.vue"),
  },
];

export default routes;
