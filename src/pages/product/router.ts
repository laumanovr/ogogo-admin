import {findComponent} from "@/shared/lib/utils/findComponent";

const routes = [
    {
        path: "/products",
        name: "products",
        component: findComponent("product", "ProductList")
    },
    {
        path: "/products/:id",
        name: "productDetail",
        component: findComponent("product", "ProductDetail")
    }
];

export default routes;