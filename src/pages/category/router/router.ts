import CategoryEmpty from "@/pages/category/ui/CategoryEmpty.vue";
import { RouteRecordRaw } from "vue-router";
import { Routes } from "@/shared/router/index.type";

const routes: RouteRecordRaw[] = [
  {
    path: Routes.category,
    name: "category",
    component: () => import("../ui/Category.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: `${Routes.category}/empty`,
    name: "category-empty",
    component: CategoryEmpty,
    meta: { requiresAuth: true },
  },
];

export default routes;
