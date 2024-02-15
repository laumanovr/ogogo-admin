import {findComponent} from "@/shared/lib/utils/findComponent";

const routes = [
    {
        path: "/product",
        name: "product",
        component: findComponent("product", "ProductList")
    },
    {
        path: "/product/:id",
        name: "productDetail",
        component: findComponent("product", "ProductDetail")
    }
];

export default routes;