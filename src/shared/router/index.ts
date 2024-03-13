import {
  createRouter,
  createWebHistory,
  NavigationGuard,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw,
} from "vue-router";
import categoryRoute from "@/pages/category/router/router";
import propertyRoutes from "@/pages/property/router";
import loginRoutes from "@/pages/login/router";
import shopRoutes from "@/pages/shop/router";
import productRoutes from "@/pages/product/router";
import { Routes } from "./index.type";
import { useAuthStore } from "../store/auth";
import { compose } from "ramda";

const routes: RouteRecordRaw[] = [
  ...categoryRoute,
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
