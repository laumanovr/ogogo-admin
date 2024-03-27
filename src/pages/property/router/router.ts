import { RouteRecordRaw } from "vue-router";
import { ROUTES } from "@/shared/router/index.type";

const routes: RouteRecordRaw[] = [
  {
    path: ROUTES.property,
    name: "property",
    component: () => import(`../ui/property-list/PropertyList.vue`),
  },
  {
    path: `${ROUTES.property}/:id`,
    name: "propertyValue",
    component: () => import(`../ui/property-value/PropertyValue.vue`),
  },
];

export default routes;
