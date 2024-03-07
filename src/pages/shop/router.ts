import { findComponent } from "@/shared/lib/utils/findComponent";

const routes = [
  {
    path: "/shops",
    name: "shops",
    component: findComponent("shop", "ShopList"),
    meta: { requiresAuth: true },
  },
  {
    path: "/shops/:id",
    name: "shopDetail",
    component: findComponent("shop", "ShopDetail"),
    meta: { requiresAuth: true },
  },
];

export default routes;
