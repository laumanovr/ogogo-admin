import { NavigationGuard } from "vue-router";
import { ROUTES } from "../index.type";
import { useAuthStore } from "../../store/auth";

export const authMiddleware: NavigationGuard = (to, _from, next) => {
  const authStore = useAuthStore();
  const token = authStore.getSessionId;

  if (!token && to.path !== ROUTES.login) {
    next({ path: ROUTES.login });
  } else if (token && to.path === ROUTES.login) {
    next({ name: "property" });
  } else {
    next();
  }
};
