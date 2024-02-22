import { findComponent } from "@/shared/lib/utils/findComponent";
import CategoryEmpty from "@/pages/category/CategoryEmpty.vue";

const route = [
  {
    path: "/category",
    name: "category",
    component: findComponent("category", "Index"),
  },
  {
    path: "/category/empty",
    name: "category-empty",
    component: CategoryEmpty,
  },
];

export default route;
