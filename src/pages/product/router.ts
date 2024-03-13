import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/products",
    name: "products",
    component: () => import("./ui/ProductList.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/products/:id",
    name: "productDetail",
    component: () => import("./ui/ProductDetail.vue"),
    meta: { requiresAuth: true },
  },
];

export default routes;
