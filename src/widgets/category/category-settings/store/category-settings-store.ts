import { defineStore } from "pinia";
import { ICategory } from "./category-settings-store.types";
// import { saveCategorySettings } from "../api/category-settings-api";
import { useLoaderStore } from "@/shared/store/loader";
import { useAlertStore } from "@/shared/store/alert";
import i18n from "@/shared/lib/plugins/i18n";
import { useCategorySharedStore } from "@/shared/store/category";

import { findObjectInMultidimensionalArray } from "../utils/findObjectInMultidimensionalArray";
import { ICategorySettings } from "@/shared/api/category/index.types";
import { container } from "tsyringe";
import { CategorySettingsApi } from "../api/category-settings-api";
import { useLeftSideBarStore } from "../../left-side-bar/store/left-side-bar-store";

const categorySettingsApi = container.resolve(CategorySettingsApi);

export const useCategoryStore = defineStore("category-store", {
  state: (): ICategory => {
    return {
      categoryName: null,
      categoryNameKy: null,
      categoryNameEn: null,
      parentId: null,
      sequenceNumber: null,
      icoBase64: null,
      imageId: null,
      properties: null,
    };
  },
  getters: {
    getCategoryName(): string {
      return this.categoryName;
    },
    getParentId(): string {
      return this.parentId;
    },
    getSequenceNumber(): number {
      return this.sequenceNumber;
    },
  },
  actions: {
    setCategoryName(value: string) {
      this.categoryName = value;
    },
    setParentId(value: string) {
      this.parentId = value;
    },
    setSequenceNumber(value: number) {
      this.sequenceNumber = value;
    },

    saveCategorySettings() {
      const loaderStore = useLoaderStore();
      const alertStore = useAlertStore();

      let { t } = i18n.global;

      const categorySharedStore = useCategorySharedStore();
      const leftSideBarStore = useLeftSideBarStore();

      const foundCategory = findObjectInMultidimensionalArray(
        categorySharedStore.getCategories,
        "parentId"
      );

      const payload = {
        parentId: foundCategory?.parentId,
        categoryName: categorySharedStore.getRu ?? "",
        categoryNameKy: categorySharedStore.getEn,
        categoryNameEn: categorySharedStore.getKy,
        imageId: categorySharedStore.getImageId,
        icoBase64: categorySharedStore.getIcoBase64,
        properties: categorySharedStore.getProperties,
        sequenceNumber: foundCategory?.sequenceNumber ?? 0,
      };

      return new Promise<ICategorySettings>((resolve, reject) => {
        loaderStore.setLoaderState(true);
        if (!categorySharedStore.getCategoryId) {
          categorySettingsApi
            .saveCategorySettings(payload)
            .then((res) => {
              alertStore.showSuccess(
                t("lang-5fa5d291-8d85-49f0-bebe-0dae2f7e1858")
              );
              loaderStore.setLoaderState(false);
              categorySharedStore.setId(res.id);
              categorySharedStore.fetchCategoryById(res.id);

              resolve(res);
            })
            .catch((err) => {
              alertStore.showError(err?.error?.errorMessage);
              loaderStore.setLoaderState(false);
              reject(err);
            });
        } else {
          const updatePayload = {
            ...payload,
            id: categorySharedStore.getCategoryId,
          };

          categorySettingsApi
            .updateCategorySettings(updatePayload)
            .then((res) => {
              alertStore.showSuccess(
                t("lang-5fa5d291-8d85-49f0-bebe-0dae2f7e1858")
              );
              loaderStore.setLoaderState(false);
              leftSideBarStore.fetchGetMarketlace();
              // categorySharedStore.setId(res.id);
              resolve(res);
            })
            .catch((err) => {
              alertStore.showError(err?.error?.errorMessage);
              loaderStore.setLoaderState(false);
              reject(err);
            });
        }
      });
    },
  },
});
