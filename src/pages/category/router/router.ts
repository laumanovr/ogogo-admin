import CategoryEmpty from "@/pages/category/ui/CategoryEmpty.vue";
import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/category",
    name: "category",
    component: () => import("../ui/Category.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/category/empty",
    name: "category-empty",
    component: CategoryEmpty,
    meta: { requiresAuth: true },
  },
];

export default routes;
