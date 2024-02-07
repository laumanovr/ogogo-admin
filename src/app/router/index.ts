import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized,
  RouteRecordRaw,
} from "vue-router";
import { Component } from "vue";
import Login from "@/pages/Login.vue";
import Home from "@/pages/Home.vue";
import { AuthMiddleware } from "@/app/router/middlware/auth";
import { AccessRequestMiddleware } from "@/app/router/middlware/access-request";
import Chain from "./middlware/chain";
import { flattenRoutes, transformToRouter } from "@/shared/utils/route";

// const findComponent = (path: string) => () => import(`../views/${path}.vue`);

const routes: { path: string; component: Component; name: string }[] = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/home",
    name: "home",
    component: Home,
  },
];

// console.log(import.meta.env.VUE_APP_API_SERVER);
// console.log(process.env.VUE_APP_API_SERVER);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// axios.defaults.baseURL = process.env.VUE_APP_API_SERVER;
// const _routes = routes;

const _routes = flattenRoutes(routes);
const finalRoutes = transformToRouter(_routes);
// const finalRoutes = transformToRouter(_routes);

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: finalRoutes,
// });

const middlewares = [new AuthMiddleware(), new AccessRequestMiddleware()];
const chain = new Chain(middlewares, finalRoutes);

// router.beforeEach(
//   // (
//   //   to: RouteLocationNormalized,
//   //   from: RouteLocationNormalized,
//   //   next: Function
//   // ) => {
//   //   chain.handle(to, from, next);
//   // }
// );

router.beforeEach(() =>
  // to: RouteLocationNormalized,
  // from: RouteLocationNormalized,
  // next: Function
  {
    middlewares;
  }
);

export default router;

// import {
//   createRouter,
//   createWebHistory,
//   type RouteLocationNormalized,
// } from "vue-router";

// middlewares
// import Chain from "./middleware/chain";
// import { AuthMiddleware } from "@/modules/auth/router/middleware/auth";

// import { flattenRoutes, transformToRouter } from "@/utils/route";
// import { routes } from "./routes";
// import { AccessRequestMiddleware } from "@/modules/auth/router/middleware/access-request";

// const _routes = flattenRoutes(routes);
// const finalRoutes = transformToRouter(_routes);

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: finalRoutes,
// });

// const middlewares = [new AuthMiddleware(), new AccessRequestMiddleware()];
// const chain = new Chain(middlewares, finalRoutes);

// router.beforeEach(
//   (
//     to: RouteLocationNormalized,
//     from: RouteLocationNormalized,
//     next: Function
//   ) => {
//     chain.handle(to, from, next);
//   }
// );

// export default router;
