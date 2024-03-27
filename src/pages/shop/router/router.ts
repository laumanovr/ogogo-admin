import { RouteRecordRaw } from "vue-router";
import { ROUTES } from "@/shared/router/index.type";

const routes: RouteRecordRaw[] = [
  {
    path: ROUTES.shops,
    name: "shops",
    component: () => import("../ui/shop-list/ShopList.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: `${ROUTES.shops}/:id`,
    name: "shopDetail",
    component: () => import("../ui/shop-detail/ShopDetail.vue"),
    meta: { requiresAuth: true },
  },
];

export default routes;
