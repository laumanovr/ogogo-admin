import { RouteRecordRaw } from "vue-router";
import { Routes } from "@/shared/router/index.type";

const routes: RouteRecordRaw[] = [
  {
    path: Routes.shops,
    name: "shops",
    component: () => import("../ui/ShopList.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: `${Routes.shops}/:id`,
    name: "shopDetail",
    component: () => import("../ui/ShopDetail.vue"),
    meta: { requiresAuth: true },
  },
];

export default routes;
