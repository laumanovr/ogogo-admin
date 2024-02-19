import type { RouteLocationNormalized } from "vue-router";
import { useAuthStore } from "@/shared/store/auth/index";
import { BaseHandler } from "@/app/router/middlware/auth.type";
import type { IRoute } from "@/app/router/middlware/auth.type";
import { useAlert } from "@/shared/lib/utils/alert";
import i18n from "@/shared/lib/plugins/i18n";

export class AccessRequestMiddleware extends BaseHandler {
  handle(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: Function,
    routes: IRoute[] = []
  ): void {
    if (to.name === "login") {
      if (this.nextHandler) {
        return this.nextHandler.handle(to, from, next, routes);
      } else {
        return this.handleLast(to, from, next, routes);
      }
    }
    const userStore = useAuthStore();
    const accessRequestIds = userStore.getAccessRequestIds;
    const toRequestId = (to?.meta?.uuid as number) ?? null;

    const showAlert = () => {
      const alert = useAlert();
      setTimeout(() => {
        alert.notify({
          message: i18n.global.t("lang-b895f3b0-bf05-4308-86da-929bf4568f60"),
          position: AlertPositionEnum.Top,
          timeout: 2,
          alertOptions: {
            color: "red",
          },
        });
      }, 2);
    };
    // check toRequestId from accessRequestIds
    if (
      to.meta.default ||
      to.meta.ignorePermission ||
      (toRequestId && accessRequestIds[toRequestId] === true)
    ) {
      if (this.nextHandler) {
        return this.nextHandler.handle(to, from, next, routes);
      } else {
        return this.handleLast(to, from, next, routes);
      }
    }

    const defaultRoute = routes.find((e) => e.meta.default);
    if (defaultRoute && to.name !== defaultRoute.name) {
      showAlert();
      return next(defaultRoute);
    }

    const first = routes.find(
      (e) => e?.meta?.uuid && accessRequestIds[e.meta.uuid]
    );
    if (first && to.name !== first.name) {
      showAlert();
      return next(first);
    }

    if (from.path === "/") return;

    showAlert();
    userStore.logout();
    next({ name: "login" });
  }
}

export enum AlertPositionEnum {
  "TopLeft" = "TopLeft",
  "TopRight" = "TopRight",
  "BottomLeft" = "BottomLeft",
  "BottomRight" = "BottomRight",
  "Top" = "Top",
  "Bottom" = "Bottom",
  "Left" = "Left",
  "Right" = "Right",
  "Center" = "Center",
}
