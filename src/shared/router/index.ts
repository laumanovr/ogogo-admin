import {
  createRouter,
  createWebHistory,
  NavigationGuard,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw,
} from "vue-router";
import { compose } from "ramda";
import { propertyRoutes } from "@/pages/property";
import { сategoryRoutes } from "@/pages/category";
import { shopRoutes } from "@/pages/shop";
import { loginRoutes } from "@/pages/login";
import { productRoutes } from "@/pages/product";
import { Routes } from "./index.type";
import { useAuthStore } from "../store/auth";

const routes: RouteRecordRaw[] = [
  ...сategoryRoutes,
  ...propertyRoutes,
  ...loginRoutes,
  ...shopRoutes,
  ...productRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export const authMiddleware: NavigationGuard = (to, _from, next) => {
  const authStore = useAuthStore();
  const token = authStore.getSessionId;

  if (!token && to.path !== Routes.login) {
    next({ path: Routes.login });
  } else if (token && to.path === Routes.login) {
    next({ name: "property" });
  } else {
    next();
  }
};

router.beforeEach(
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    compose(authMiddleware)(to, from, next);
  }
);

export default router;
