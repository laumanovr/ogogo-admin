import { createRouter, createWebHistory } from "vue-router";

// const findComponent = (path: string) => () => import(`../views/${path}.vue`);

import { Component } from "vue";
import Login from "@/pages/Login.vue";
import Home from "@/pages/Home.vue";

const routes: { path: string; component: Component; name: string }[] = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/home",
    name: "home",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
