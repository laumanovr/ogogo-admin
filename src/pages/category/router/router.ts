import { CategoryEmpty } from "@/pages/category";
import { RouteRecordRaw } from "vue-router";
import { ROUTES } from "@/shared/router/index.type";

const routes: RouteRecordRaw[] = [
  {
    path: ROUTES.category,
    name: "category",
    component: () => import("../ui/category/Category.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: `${ROUTES.category}/empty`,
    name: "category-empty",
    component: CategoryEmpty,
    meta: { requiresAuth: true },
  },
];

export default routes;
