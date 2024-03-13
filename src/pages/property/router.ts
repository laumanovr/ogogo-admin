import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/property",
    name: "property",
    component: () => import(`./ui/PropertyList.vue`),
  },
  {
    path: "/property/:id",
    name: "propertyDetail",
    component: () => import(`./ui/PropertyDetail.vue`),
  },
];

export default routes;
