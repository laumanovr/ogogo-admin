import type { RouteLocationNormalized } from "vue-router";
import { useAuthStore } from "@/shared/store/auth/index";
import { BaseHandler } from "@/app/router/middlware/auth.type";
import type { IRoute } from "@/app/router/middlware/auth.type";

export class AuthMiddleware extends BaseHandler {
  handle(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: Function,
    routes: IRoute[] = []
  ): void {
    const userStore = useAuthStore();
    if (userStore.isLoggedIn) {
      // authenticated
      if (to.name === "login") {
        next({ name: "user-screen" }); // split based on rolename
      } else {
        if (this.nextHandler) {
          this.nextHandler.handle(to, from, next, routes);
        } else {
          this.handleLast(to, from, next, routes);
        }
      }
    } else {
      // not authenticated
      if (to.name === "login") {
        if (this.nextHandler) {
          this.nextHandler.handle(to, from, next, routes);
        } else {
          this.handleLast(to, from, next, routes);
        }
      } else {
        next({ name: "login" });
      }
    }
  }
}
