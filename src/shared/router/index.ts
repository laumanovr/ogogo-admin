import {
  createRouter,
  createWebHistory,
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
import { authMiddleware } from "./middleware/authMiddleware";

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
