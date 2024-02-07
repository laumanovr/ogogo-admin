// import type { IRoute } from "@/utils/interfaces/route.types";
import type { RouteLocationNormalized } from "vue-router";
import { IHandler, IRoute } from "./auth.type";

export default class Chain {
  private first: IHandler | null;
  private routes: IRoute[];
  constructor(middlewares: IHandler[], routes: IRoute[]) {
    if (middlewares.length > 0) {
      this.first = middlewares[0];
    } else {
      throw new Error("The middleware list is empty while initializing chain");
    }

    let middleware = this.first;
    for (let i = 1; i < middlewares.length; i++) {
      const nextMiddleware = middlewares[i];
      middleware.setNext(nextMiddleware);
      middleware = nextMiddleware;
    }
    this.routes = routes;
  }

  handle(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: Function
  ): void {
    if (this.first !== null) {
      this.first.handle(to, from, next, this.routes);
    }
  }
}
