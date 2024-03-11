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
import { getItem } from "@/shared/lib/utils/persistanceStorage";
import { TOKEN_KEY } from "@/shared/api/api.types";
import { Routes } from "./index.type";

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

const GUEST_ROUTES = [Routes.login];

const guestMiddleware: NavigationGuard = (_to, _from, next) => {
  const token = getItem(TOKEN_KEY);
  if (token) {
    next({ name: "property" });
  } else {
    next();
  }
};

const authMiddleware: NavigationGuard = (_to, _from, next) => {
  const token = getItem(TOKEN_KEY);
  if (!token) {
    next({ path: Routes.login });
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
    if (GUEST_ROUTES.includes(to.path as Routes)) {
      guestMiddleware(to, from, next);
    } else {
      authMiddleware(to, from, next);
    }
  }
);

export default router;
