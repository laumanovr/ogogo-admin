import { RouteRecordRaw } from "vue-router";
import { Routes } from "@/shared/router/index.type";

const routes: RouteRecordRaw[] = [
  {
    path: Routes.products,
    name: "products",
    component: () => import("../ui/product-list/ProductList.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: `${Routes.products}/:id`,
    name: "productDetail",
    component: () => import("../ui/product-detail/ProductDetail.vue"),
    meta: { requiresAuth: true },
  },
];

export default routes;
