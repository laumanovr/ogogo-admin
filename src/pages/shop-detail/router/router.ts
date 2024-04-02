import { ROUTES } from "@/shared/router/index.type";
import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: `${ROUTES.shops}/:id`,
    name: "shopDetail",
    component: () => import("@/pages/shop-detail/ui/ShopDetail.vue"),
    meta: { requiresAuth: true },
  },
];

export default routes;
