import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/shops",
    name: "shops",
    component: () => import("./ui/ShopList.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/shops/:id",
    name: "shopDetail",
    component: () => import("./ui/ShopDetail.vue"),
    meta: { requiresAuth: true },
  },
];

export default routes;
