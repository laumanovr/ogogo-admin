import { findComponent } from "@/shared/lib/utils/findComponent";
import CategoryEmpty from "@/pages/category/ui/CategoryEmpty.vue";

const route = [
  {
    path: "/category",
    name: "category",
    component: findComponent("category", "Category"),
  },
  {
    path: "/category/empty",
    name: "category-empty",
    component: CategoryEmpty,
  },
];

export default route;
