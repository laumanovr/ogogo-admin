import { findComponent } from "@/shared/lib/utils/findComponent";

const route = {
  path: "/category",
  name: "category",
  component: findComponent("category", "Index"),
};

export default route;
