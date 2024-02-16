import {findComponent} from "@/shared/lib/utils/findComponent";

const routes = [
    {
        path: "/property",
        name: "property",
        component: findComponent("property", "PropertyList"),
    },
    {
        path: "/property/:id",
        name: "propertyDetail",
        component: findComponent("property", "PropertyDetail"),
    },
];

export default routes;