import { useAlertStore } from "@/shared/store/alert";
import { useLoaderStore } from "@/shared/store/loader";
import { defineStore } from "pinia";
import { container } from "tsyringe";
import { CategoryApi } from "../api/CategoryApi";
import { CategoryState } from "./types";
import { CategoryEntity, CategoryTreeEntity } from "../model/types";
import { findObjectInMultidimensionalArray } from "@/entities/category/utils/findObjectInMultidimensionalArray";
import i18n from "@/shared/lib/plugins/i18n";

const categoryApiService = container.resolve(CategoryApi);

const NAME_ID = "category-store";

export const useCategoryStore = defineStore(NAME_ID, {
  state: (): CategoryState => {
    return {
      categoryName: null,
      parentId: null,
      sequenceNumber: null,
      propertySetId: null,
      categories: [],
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
    getCategories(): CategoryTreeEntity[] {
      return this.categories;
    },
    getCategoryHasChanged(): boolean {
      return this.categoryHasChanged;
    },
    getCategoryById(): CategoryEntity {
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

      const { t } = i18n.global;

      const foundCategory = findObjectInMultidimensionalArray(
        this.getCategories,
        "parentId"
      );

      const payload = {
        parentId: foundCategory?.parentId,
        categoryName: this.getRu,
        categoryNameKy: this.getKy,
        categoryNameEn: this.getEn,
        sequenceNumber: this.getSequenceNumber,
        properties: [""],
        icoBase64: "",
        imageId: "",
      };

      return new Promise((resolve, reject) => {
        loaderStore.setLoaderState(true);
        categoryApiService
          .createCategory(payload)
          .then((res) => {
            alertStore.showSuccess(
              t("lang-5fa5d291-8d85-49f0-bebe-0dae2f7e1858")
            );
            loaderStore.setLoaderState(false);
            this.setId(res.id);
            resolve(res);
          })
          .catch((err) => {
            alertStore.showError(err?.error?.errorMessage);
            loaderStore.setLoaderState(false);
            reject(err);
          });
      });
    },
    setId(value: string) {
      const payload = {
        ...this.categories[0],
        id: value,
      };

      this.categories[0] = payload;
    },
    setAddCategory(value: CategoryTreeEntity) {
      this.categories.push(value);
    },
    setCategories(value: CategoryTreeEntity[]) {
      this.categories = value;
    },
    setCategoryIcon(value: string) {
      const foundCategory = findObjectInMultidimensionalArray(
        this.categories,
        "active"
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
    fetchCategoryById(id: string): Promise<CategoryEntity> {
      return new Promise((resolve, reject) => {
        categoryApiService
          .getCategoryById(id)
          .then((res) => {
            this.setTranslation(res.categoryName, "ru");
            this.setTranslation(res.categoryNameKy, "ky");
            this.setTranslation(res.categoryNameEn, "en");
            this.categoryById = res;
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    fetchCategoriesTree() {
      return new Promise((resolve, reject) => {
        categoryApiService
          .getCategories()
          .then((res) => {
            this.categories = res;
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
});
