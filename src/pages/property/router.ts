import { RouteRecordRaw } from "vue-router";
import { authMiddleware } from "@/shared/router";
import { compose } from "ramda";

const routes: RouteRecordRaw[] = [
  {
    path: "/property",
    name: "property",
    component: () => import(`./ui/PropertyList.vue`),
    beforeEnter: (to, from, next) => {
      compose(authMiddleware)(to, from, next);
    },
  },
  {
    path: "/property/:id",
    name: "propertyDetail",
    component: () => import(`./ui/PropertyDetail.vue`),
    beforeEnter: (to, from, next) => {
      compose(authMiddleware)(to, from, next);
    },
  },
];

export default routes;
