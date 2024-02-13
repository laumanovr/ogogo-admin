import {findComponent} from "@/shared/lib/utils/findComponent";

const routes = [
    {
        path: "/",
        name: "login",
        component: findComponent("login", "Login")
    },

];

export default routes;