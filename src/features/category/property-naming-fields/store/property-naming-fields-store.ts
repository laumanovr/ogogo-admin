import { defineStore } from "pinia";
import { IPropertyNamingFields } from "./property-naming-fields-store.types";
import { useCategorySharedStore } from "@/shared/store/category";

export const usePropertyNamingFieldsStore = defineStore(
  "property-naming-fields",
  {
    state: () => {
      return {};
    },
    getters: {},
    actions: {},
  }
);
