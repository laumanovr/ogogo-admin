import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const findComponent = (path: string) => () => import(`../../pages/${path}.vue`);

const routes: { path: string; component: () => Promise<any>; name: string }[] = [
    {
        path: '/',
        name: 'login',
        component: findComponent('Login')
    },
    {
        path: '/property',
        name: 'property',
        component: findComponent('Property')
    },
    {
        path: '/property/:id',
        name: 'propertyDetail',
        component: findComponent('PropertyDetail')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
