import {
  createRouter,
  createWebHistory,
  NavigationGuard,
  RouteRecordRaw,
} from "vue-router";
import categoryRoute from "@/pages/category/router/router";
import propertyRoutes from "@/pages/property/router";
import loginRoutes from "@/pages/login/router";
import shopRoutes from "@/pages/shop/router";
import productRoutes from "@/pages/product/router";
import { Routes } from "./index.type";
import { useAuthStore } from "../store/auth";

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

export const guestMiddleware: NavigationGuard = (_to, _from, next) => {
  const authStore = useAuthStore();
  const token = authStore.getSessionId;
  if (token) {
    next({ name: "property" });
  } else {
    next();
  }
};

export const authMiddleware: NavigationGuard = (_to, _from, next) => {
  const authStore = useAuthStore();
  const token = authStore.getSessionId;
  if (!token) {
    next({ path: Routes.login });
  } else {
    next();
  }
};

export default router;
