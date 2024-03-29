import { RouteRecordRaw } from "vue-router";
import { ROUTES } from "@/shared/router/index.type";

const routes: RouteRecordRaw[] = [
  {
    path: ROUTES.shops,
    name: "shops",
    component: () => import("@/pages/shop-list/ui/ShopList.vue"),
    meta: { requiresAuth: true },
  },
];

export default routes;
