import { findComponent } from "@/shared/lib/utils/findComponent";
import CategoryEmpty from "@/pages/category/ui/CategoryEmpty.vue";

const route = [
  {
    path: "/category",
    name: "category",
    component: findComponent("category", "Category"),
    meta: { requiresAuth: true },
  },
  {
    path: "/category/empty",
    name: "category-empty",
    component: CategoryEmpty,
    meta: { requiresAuth: true },
  },
];

export default route;
