import { findComponent } from "@/shared/lib/utils/findComponent";

const routes = [
  {
    path: "/property",
    name: "property",
    component: findComponent("property", "PropertyList"),
    meta: { requiresAuth: true },
  },
  {
    path: "/property/:id",
    name: "propertyDetail",
    component: findComponent("property", "PropertyDetail"),
    meta: { requiresAuth: true },
  },
];

export default routes;
