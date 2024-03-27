import { NavigationGuard } from "vue-router";
import { Routes } from "../index.type";
import { useAuthStore } from "../../store/auth";

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
