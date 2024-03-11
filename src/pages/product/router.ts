import { findComponent } from "@/shared/lib/utils/findComponent";

const routes = [
  {
    path: "/products",
    name: "products",
    component: findComponent("product", "ProductList"),
    meta: { requiresAuth: true },
  },
  {
    path: "/products/:id",
    name: "productDetail",
    component: findComponent("product", "ProductDetail"),
    meta: { requiresAuth: true },
  },
];

export default routes;
