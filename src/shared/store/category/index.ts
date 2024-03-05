import { defineStore } from "pinia";
import { ICategory, ICategorySharedState } from "./index.types";
import { findObjectInMultidimensionalArray } from "@/shared/lib/utils/category/findObjectInMultidimensionalArray";
import { getCategoryById } from "@/shared/api/category";
import { ICategorySettings } from "@/shared/api/category/index.types";

export const useCategorySharedStore = defineStore("category-shared-store", {
  state: (): ICategorySharedState => {
    return {
      categories: [
        {
          categoryName: "lang-b14d63cd-580a-4645-8c82-860175a3830f",
          childMarketplaceCategoryIdList: [],
          active: true,
          icon: null,
          id: null,
        },
      ],
      categoryIcon: null,
      categoryHasChanged: false,

      categoryById: null,

      namingFields: {
        ru: null,
        en: null,
        ky: null,
      },
    };
  },
  getters: {
    getCategories(): ICategory[] {
      return this.categories;
    },
    getCategoryHasChanged(): boolean {
      return this.categoryHasChanged;
    },
    getCategoryById(): ICategorySettings {
      return this.categoryById;
    },
    getRu(): string {
      return this.namingFields.ru;
    },
    getEn(): string {
      return this.namingFields.en;
    },
    getKy(): string {
      return this.namingFields.ky;
    },
  },
  actions: {
    setId(value: string) {
      const payload = {
        ...this.categories[0],
        id: value,
      };

      this.categories[0] = payload;
    },
    setAddCategory(value: ICategory) {
      this.categories.push(value);
    },
    setCategories(value: ICategory[]) {
      this.categories = value;
    },
    setCategoryIcon(value: string) {
      const foundCategory = findObjectInMultidimensionalArray(
        this.categories,
        "active",
        true
      );

      foundCategory.icon = value;
    },
    setCategoryHasChanged(value: boolean) {
      this.categoryHasChanged = value;
    },
    setTranslation(value: string, key: string) {
      if (key === "ru") {
        this.namingFields.ru = value;
      } else if (key === "ky") {
        this.namingFields.ky = value;
      } else if (key === "en") {
        this.namingFields.en = value;
      }
    },
    fetchCategoryById(id: string) {
      return new Promise((resolve, reject) => {
        getCategoryById(id)
          .then((res) => {
            this.setTranslation(res.categoryName, "ru");
            this.setTranslation(res.translations.additionalProp1, "ky");
            this.setTranslation(res.translations.additionalProp1, "en");
            this.categoryById = res;
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
});
