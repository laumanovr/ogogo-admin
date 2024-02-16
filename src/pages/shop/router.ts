import {findComponent} from "@/shared/lib/utils/findComponent";

const routes = [
    {
        path: "/shops",
        name: "shops",
        component: findComponent("shop", "ShopList")
    },
    {
        path: "/shops/:id",
        name: "shopDetail",
        component: findComponent("shop", "ShopDetail")
    }
];

export default routes;