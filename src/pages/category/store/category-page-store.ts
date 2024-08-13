import { defineStore } from "pinia";

import { ICategory, ICategoryPageState } from "./category-page-store.types";

export const useCategoryPageStore = defineStore("category-page", {
  state: (): ICategoryPageState => {
    return {
      leftSideBarhierarchy: [
        {
          title: "lang-b14d63cd-580a-4645-8c82-860175a3830f",
          childMarketplaceCategoryIdList: [],
        },
      ],
    };
  },
  getters: {
    getLeftSideBarhierarchy(): ICategory[] {
      return this.leftSideBarhierarchy;
    },
  },
  actions: {
    setLeftSideBarhierarchy(value: any[]) {
      this.leftSideBarhierarchy = value;
    },
  },
});
