import { authMiddleware } from "@/shared/router";
import { compose } from "ramda";
import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/shops",
    name: "shops",
    component: () => import("./ui/ShopList.vue"),
    meta: { requiresAuth: true },
    beforeEnter: (to, from, next) => {
      compose(authMiddleware)(to, from, next);
    },
  },
  {
    path: "/shops/:id",
    name: "shopDetail",
    component: () => import("./ui/ShopDetail.vue"),
    meta: { requiresAuth: true },
    beforeEnter: (to, from, next) => {
      compose(authMiddleware)(to, from, next);
    },
  },
];

export default routes;
