import { AuthMiddleware } from "@/app/router/middlware/auth";
import { AccessRequestMiddleware } from "@/app/router/middlware/access-request";
import Chain from "./middlware/chain";
import { flattenRoutes, transformToRouter } from "@/shared/lib/utils/route";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import catergoryRoute from "@/pages/category/router";
import Login from "@/pages/login/Login.vue";
import Property from "@/pages/property/Property.vue";
import PropertyDetail from "@/pages/property-detail/PropertyDetail.vue";

const routes: RouteRecordRaw[] =
  [
    {
      path: "/",
      name: "login",
      component: Login,
    },
    {
      path: "/property",
      name: "property",
      component: Property,
    },
    {
      path: "/property/:id",
      name: "propertyDetail",
      component: PropertyDetail,
    },
    catergoryRoute,
    // {
    //   path: "/home",
    //   name: "home",
    //   component: Home,
    // },
  ];

const router = createRouter({
  history: createWebHistory(),
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
