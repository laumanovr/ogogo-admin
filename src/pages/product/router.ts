import { RouteRecordRaw } from "vue-router";
import { authMiddleware } from "@/shared/router";
import { compose } from "ramda";

const routes: RouteRecordRaw[] = [
  {
    path: "/products",
    name: "products",
    component: () => import("./ui/ProductList.vue"),
    meta: { requiresAuth: true },
    beforeEnter: (to, from, next) => {
      compose(authMiddleware)(to, from, next);
    },
  },
  {
    path: "/products/:id",
    name: "productDetail",
    component: () => import("./ui/ProductDetail.vue"),
    meta: { requiresAuth: true },
    beforeEnter: (to, from, next) => {
      compose(authMiddleware)(to, from, next);
    },
  },
];

export default routes;
