import {findComponent} from "@/shared/lib/utils/findComponent";

const routes = [
    {
        path: "/shop",
        name: "shop",
        component: findComponent("shop", "ShopList")
    },
    {
        path: "/shop/:id",
        name: "shopDetail",
        component: findComponent("shop", "ShopDetail")
    }
];

export default routes;