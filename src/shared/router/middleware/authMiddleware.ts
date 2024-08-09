import { NavigationGuard } from "vue-router";
import { ROUTES } from "../index.type";
import { useAuthStore } from "../../store/auth";

export const authMiddleware: NavigationGuard = (to, _from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.getSessionId;

  if (to.name === "login" && isAuthenticated) {
    next({ name: "products" });
  } else if (to.name === "login" && !isAuthenticated) {
    next();
  } else if (isAuthenticated) {
    next();
  } else {
    next({ path: ROUTES.login });
  }
};
