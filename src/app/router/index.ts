import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import categoryRoute from "@/pages/category/router/router";
import propertyRoutes from "@/pages/property/router";
import loginRoutes from "@/pages/login/router";
import shopRoutes from "@/pages/shop/router";
import productRoutes from "@/pages/product/router";

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

// axios.defaults.baseURL = process.env.VUE_APP_API_SERVER;
// const _routes = routes;

// const _routes = flattenRoutes(routes);
// const finalRoutes = transformToRouter(_routes);

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: finalRoutes,
// });

// const middlewares = [new AuthMiddleware(), new AccessRequestMiddleware()];
// const chain = new Chain(middlewares, finalRoutes);

// router.beforeEach(
//   // (
//   //   to: RouteLocationNormalized,
//   //   from: RouteLocationNormalized,
//   //   next: Function
//   // ) => {
//   //   chain.handle(to, from, next);
//   // }
// );

export default router;