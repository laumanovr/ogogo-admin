// import type { IRoute } from "@/utils/interfaces/route.types";

import { IRoute } from "@/app/router/middlware/auth.type";

export function modularize(routes: IRoute[], modulename: string[]): IRoute[] {
  const _modulename = modulename.filter((e) => e.length > 0);

  const chainHandler = new RouteChain();
  let _tempRoutes: IRoute[] = [];

  routes.forEach((route) => {
    const { children, ..._route } = route;
    let _children: IRoute[] = [];
    if (children && children.length > 0) {
      _children = [...modularize(children, [..._modulename])];
    }

    chainHandler
      .setNewRoute(_route, modulename)
      .addModuleKeyToName()
      .addModuleKeyToPath();

    const _retRoute = chainHandler.getRoute();
    _retRoute.children = _children;
    _tempRoutes = [..._tempRoutes, _retRoute];
  });

  return _tempRoutes;
}

export function flattenRoutes(routes: IRoute[]): any[] {
  let _tempRoutes: any[] = [];
  routes.forEach((route) => {
    const { children, ..._route } = route;
    if (children && children.length > 0) {
      _tempRoutes = [..._tempRoutes, ...flattenRoutes(children)];
    }

    _tempRoutes = [..._tempRoutes, _route];
  });

  return _tempRoutes;
}

export function transformToRouter(routes: IRoute[]): any[] {
  const _routes = routes
    .map((e) => {
      // if (e.meta.isPath) {
      return {
        path: e.path,
        name: e.name,
        component: e.component,
        meta: {
          ...e.meta,
        },
        // };
      };
    })
    .filter((e) => e !== null);

  return _routes;
}

export function transformToTree(routes: IRoute[]): any {
  let _routes: IRoute[] = [];
  routes.forEach((route) => {
    const { children, ..._route } = route;
    let _children: IRoute[] = [];
    if (children && children.length > 0) {
      _children = transformToTree(children);
    }

    if (_route.meta.renderTree) {
      route.children = _children;
      _routes = [..._routes, route];
    }
  });

  return _routes;
}

class RouteChain {
  route: IRoute;
  moduleName: string[];

  setNewRoute(route: IRoute, moduleName: string[]): RouteChain {
    this.route = route;
    this.moduleName = moduleName;
    return this;
  }

  addModuleKeyToPath(): RouteChain {
    if (this.route.meta.transform.ignorePath) {
      return this;
    } else {
      if (this.route.path === "/") {
        this.route.path = "/" + this.moduleName.join("/");
      } else {
        const path = "/" + this.moduleName.join("/") + this.route.path;
        this.route.path = path;
      }
      return this;
    }
  }

  addModuleKeyToName(): RouteChain {
    if (this.route.meta.transform.ignoreName) {
      return this;
    } else {
      if (this.route.name === "") {
        this.route.name = this.moduleName.join(".");
      } else {
        const name = this.moduleName.join(".") + "." + this.route.name;
        this.route.name = name;
      }
      return this;
    }
  }

  getRoute(): IRoute {
    return this.route;
  }
}
