import { useCategorySharedStore } from "@/shared/store/category";
import { defineStore } from "pinia";

import { ILeftSideBarState } from "./left-side-bar-store.types";
import { getMarketlace } from "../api";

export const useLeftSideBarStore = defineStore("left-side-bar-store", {
  state: (): ILeftSideBarState => {
    return {};
  },
  getters: {
    getCategoryName(): string {
      return "";
    },
  },
  actions: {
    fetchGetMarketlace() {
      return new Promise((resolve, reject) => {
        getMarketlace()
          .then((res) => {
            const categorySharedStore = useCategorySharedStore();

            const payload = res.map((e) => {
              const res = {
                ...e,
                childMarketplaceCategoryIdList: e.childMarketplaceCategories,
              };

              delete res.childMarketplaceCategories;

              return res;
            });
            categorySharedStore.setCategories(payload);
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
});
