import { RouteRecordRaw } from "vue-router";
import { ROUTES } from "@/shared/router/index.type";

const routes: RouteRecordRaw[] = [
  {
    path: ROUTES.products,
    name: "products",
    component: () => import("../ui/product-list/ProductList.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: `${ROUTES.products}/:id`,
    name: "productDetail",
    component: () => import("../ui/product-detail/ProductDetail.vue"),
    meta: { requiresAuth: true },
  },
];

export default routes;
