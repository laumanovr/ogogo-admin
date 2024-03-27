import { RouteRecordRaw } from "vue-router";
import { Routes } from "@/shared/router/index.type";

const routes: RouteRecordRaw[] = [
  {
    path: Routes.property,
    name: "property",
    component: () => import(`../ui/property-list/PropertyList.vue`),
  },
  {
    path: `${Routes.property}/:id`,
    name: "propertyValue",
    component: () => import(`../ui/property-value/PropertyValue.vue`),
  },
];

export default routes;
