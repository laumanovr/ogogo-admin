import CategoryEmpty from "@/pages/category/ui/CategoryEmpty.vue";
import { RouteRecordRaw } from "vue-router";
import { authMiddleware } from "@/shared/router";
import { compose } from "ramda";

const routes: RouteRecordRaw[] = [
  {
    path: "/category",
    name: "category",
    component: () => import("../ui/Category.vue"),
    meta: { requiresAuth: true },
    beforeEnter(to, from, next) {
      compose(authMiddleware)(to, from, next);
    },
  },
  {
    path: "/category/empty",
    name: "category-empty",
    component: CategoryEmpty,
    meta: { requiresAuth: true },
    beforeEnter(to, from, next) {
      compose(authMiddleware)(to, from, next);
    },
  },
];

export default routes;
