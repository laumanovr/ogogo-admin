import { useCategorySharedStore } from "@/shared/store/category";
import { defineStore } from "pinia";

import { ILeftSideBarState } from "./left-side-bar-store.types";
import { getMarketlace } from "../api";
import { ICategory } from "../api/index.types";

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

            const multidimensionalArray = (array: ICategory[]): ICategory[] => {
              return array.map((obj: ICategory) => {
                // Delete the property from the current object

                obj.childMarketplaceCategoryIdList =
                  obj.childMarketplaceCategories;
                delete obj.childMarketplaceCategories;

                if (
                  obj.childMarketplaceCategoryIdList &&
                  Array.isArray(obj.childMarketplaceCategoryIdList)
                ) {
                  multidimensionalArray(obj.childMarketplaceCategoryIdList);
                }

                return obj;
              });
            };

            const payload = multidimensionalArray(res);
            payload[0].active = true;

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
