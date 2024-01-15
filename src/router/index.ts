import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const findComponent = (path: string) => () => import(`../views/${path}.vue`);

const routes: { path: string; component: () => Promise<any>; name: string }[] = [
    {
        path: '/',
        name: 'login',
        component: findComponent('Login')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;