import { defineStore } from "pinia";
import { ICategory } from "./category-settings-store.types";
import { saveCategorySettings } from "../api/category-settings-api";
import { useLoaderStore } from "@/shared/store/loader";
import { useAlertStore } from "@/shared/store/alert";
import i18n from "@/shared/lib/plugins/i18n";
import { useCategorySharedStore } from "@/shared/store/category";

import { findObjectInMultidimensionalArray } from "../utils/findObjectInMultidimensionalArray";
import { ICategorySettings } from "@/shared/api/category/index.types";

export const useCategoryStore = defineStore("category-store", {
  state: (): ICategory => {
    return {
      categoryName: null,
      parentId: null,
      sequenceNumber: null,
      propertySetId: null,
      translations: {
        ky: null,
        en: null,
      },
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
    getPropertySetId(): string {
      return this.propertySetId;
    },
    getTranslation(): { en: string; ky: string } {
      return this.translations;
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
    setPropertySetId(value: string) {
      this.propertySetId = value;
    },

    saveCategorySettings() {
      const loaderStore = useLoaderStore();
      const alertStore = useAlertStore();

      let { t } = i18n.global;

      const categorySharedStore = useCategorySharedStore();

      const foundCategory = findObjectInMultidimensionalArray(
        categorySharedStore.getCategories,
        "parentId"
      );

      const payload = {
        parentId: foundCategory?.parentId,
        categoryName: categorySharedStore.getRu,
        translations: {
          en: categorySharedStore.getEn,
          ky: categorySharedStore.getKy,
        },
      };

      return new Promise<ICategorySettings>((resolve, reject) => {
        loaderStore.setLoaderState(true);
        saveCategorySettings(payload)
          .then((res) => {
            alertStore.showSuccess(
              t("lang-5fa5d291-8d85-49f0-bebe-0dae2f7e1858")
            );
            loaderStore.setLoaderState(false);
            categorySharedStore.setId(res.id);
            resolve(res);
          })
          .catch((err) => {
            alertStore.showError(err?.error?.errorMessage);
            loaderStore.setLoaderState(false);
            reject(err);
          });
      });
    },
  },
});
