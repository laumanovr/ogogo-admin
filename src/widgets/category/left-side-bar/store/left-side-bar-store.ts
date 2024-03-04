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

            const multidimensionalArray = (array: any) => {
              return array.map((obj: any) => {
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

            // const payload = multidimensionalArray(res);

            // const payload = res.map((e) => {
            //   const res = {
            //     ...e,
            //     childMarketplaceCategoryIdList: e.childMarketplaceCategories,
            //   };

            //   delete res.childMarketplaceCategories;

            //   return res;
            // });
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
