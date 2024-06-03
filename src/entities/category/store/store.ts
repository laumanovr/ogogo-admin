import { useAlertStore } from "@/shared/store/alert";
import { useLoaderStore } from "@/shared/store/loader";
import { defineStore } from "pinia";
import { container } from "tsyringe";
import { CategoryApi } from "../api/CategoryApi";
import { CategoryState } from "./types";
import {
  CategoryByIdProperty,
  CategoryEntity,
  CategoryModified,
  CategoryTreeEntity,
  PropertyValueAutocomplete,
} from "../model/types";
import { findObjectInMultidimensionalArray } from "@/entities/category/utils/findObjectInMultidimensionalArray";
import i18n from "@/shared/lib/plugins/i18n";
import { useAuthStore } from "@/shared/store/auth";
import { FileApi } from "@/shared/api/file";

const categoryApiService = container.resolve(CategoryApi);

const fileApiService = container.resolve(FileApi);

const NAME_ID = "category-store";

export const useCategoryStore = defineStore(NAME_ID, {
  state: (): CategoryState => {
    return {
      categoryName: null,
      categoryNameKy: null,
      categoryNameEn: null,
      icoBase64: null,
      imageId: null,
      properties: [],

      parentId: null,
      sequenceNumber: null,
      propertySetId: null,
      categories: [
        {
          categoryName: "lang-b14d63cd-580a-4645-8c82-860175a3830f",
          childMarketplaceCategoryIdList: [],
          active: true,
          icon: null,
          id: null,
          sequenceNumber: null,
        },
      ],
      categoryIcon: null,
      categoryHasChanged: false,

      categoryById: null,

      categoryId: null,

      file: null,

      propertyValueAutocomplete: null,

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
    getCategories(): CategoryTreeEntity[] | CategoryModified[] {
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
    getFile(): string | File {
      return this.file;
    },
    getIcoBase64(): string | ArrayBuffer {
      return this.icoBase64;
    },
    getProperties(): CategoryByIdProperty[] {
      return this.properties;
    },
    getPropertyValueAutocomplete(): PropertyValueAutocomplete[] {
      return this.propertyValueAutocomplete;
    },
    getCategoryId(): string {
      return this.categoryId;
    },
    getImageId(): string {
      return this.imageId;
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

    setId(value: string) {
      const payload = {
        ...this.categories[0],
        id: value,
      };

      this.categories[0] = payload;
    },
    setAddCategory(value: CategoryTreeEntity | CategoryModified) {
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
    setIcoBase64(value: string | ArrayBuffer) {
      this.icoBase64 = value;
    },
    setImageId(value: string) {
      this.imageId = value;
    },
    setCategoryId(value: string) {
      this.categoryId = value;
    },

    setFile(value: string | File) {
      this.file = value;
    },

    setProperties(value: CategoryByIdProperty) {
      this.properties.push({ ...value });
    },

    setPropertiesArray(value: CategoryByIdProperty[]) {
      this.properties = value;
    },

    setPropertyAllowedValueObj(
      obj: { propertyValueId: string } | PropertyValueAutocomplete,
      propertyId: string
    ) {
      const foundProperty = this.getProperties.find((el) => {
        return el.propertyId === propertyId;
      });

      foundProperty.allowedValues.push(obj);
    },

    setDeletePropertyAllowedValueObj(
      obj: { propertyValueId: string } | PropertyValueAutocomplete,
      propertyId: string
    ) {
      const foundProperty = this.getProperties.find((el) => {
        return el.propertyId === propertyId;
      });
      foundProperty.allowedValues = foundProperty.allowedValues.filter((el) => {
        if ("id" in el && "id" in obj) {
          return el.id !== obj.id;
        }
      });
    },

    fetchCategoryById(id: string): Promise<CategoryEntity> {
      return new Promise((resolve, reject) => {
        categoryApiService
          .getCategoryById(id)
          .then((res) => {
            this.setTranslation(res.categoryName, "ru");
            this.setTranslation(res.categoryNameKy, "ky");
            this.setTranslation(res.categoryNameEn, "en");
            this.setIcoBase64(res.icoBase64);
            this.setImageId(res.imageId);

            this.setCategoryId(res.id);

            this.properties = res.properties;

            if (res.imageId) {
              // set image to show in category image preview
              this.fetchFileById(res.imageId);
            } else {
              // clear rile if there is no image
              this.file = null;
            }
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
            // this.categories = res;

            const multidimensionalArray = (
              array: CategoryTreeEntity[] | CategoryModified[]
            ): CategoryTreeEntity[] | CategoryModified[] => {
              return array.map((obj: CategoryTreeEntity | CategoryModified) => {
                // Delete the property from the current object
                if ("childMarketplaceCategories" in obj) {
                  obj.childMarketplaceCategoryIdList =
                    obj.childMarketplaceCategories;
                  delete obj.childMarketplaceCategories;
                }

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

            this.setCategories(payload as CategoryTreeEntity[]);

            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    fetchFileById(id: string): Promise<any> {
      return new Promise((resolve, reject) => {
        const authStore = useAuthStore();

        const sessionId = authStore.getSessionId;

        fileApiService
          .getFileById(id, sessionId)
          .then((result) => {
            const imageUrl = URL.createObjectURL(result);

            this.file = imageUrl;
            resolve(result);
          })
          .catch((err) => {
            reject(err);
          })
          .finally(() => {});
      });
    },

    fetchPropertiesListAutocomplete(propertyId: string) {
      return new Promise((resolve, reject) => {
        categoryApiService
          .getPropertyValueAutocomplete({
            pageIndex: 0,
            pageSize: 10000,
            queryParams: {
              propertyId: propertyId,
            },
          })
          .then((data) => {
            this.propertyValueAutocomplete = data;
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    saveCategorySettings() {
      const loaderStore = useLoaderStore();
      const alertStore = useAlertStore();

      let { t } = i18n.global;

      const foundCategory = findObjectInMultidimensionalArray(
        this.getCategories,
        "parentId"
      );

      const popertiesModified = [...this.getProperties];

      popertiesModified.forEach((el, i) => {
        el.allowedValues.forEach((el2, i2) => {
          if ("propertyValueId" in el2) {
          } else {
            popertiesModified[i].allowedValues[i2] = {
              propertyValueId: el2.id,
              propertyValueText: el2.value,
            };
          }
        });
      });

      const payload = {
        parentId: foundCategory?.parentId,
        categoryName: this.getRu ?? "",
        categoryNameKy: this.getKy,
        categoryNameEn: this.getEn,
        imageId: this.getImageId,
        icoBase64: this.getIcoBase64,
        properties: popertiesModified,
        sequenceNumber: foundCategory?.sequenceNumber ?? 0,
      };

      console.log(payload);

      return new Promise<CategoryEntity>((resolve, reject) => {
        loaderStore.setLoaderState(true);
        if (!this.getCategoryId) {
          categoryApiService
            .createCategory(payload)
            .then((res) => {
              alertStore.showSuccess(
                t("lang-5fa5d291-8d85-49f0-bebe-0dae2f7e1858")
              );
              loaderStore.setLoaderState(false);
              this.setId(res.id);
              this.fetchCategoryById(res.id);

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
            // parentId: foundCategory?.parentId,тз
            id: this.getCategoryId,
          };
          categoryApiService
            .updateCategory(updatePayload)
            .then((res) => {
              alertStore.showSuccess(
                t("lang-5fa5d291-8d85-49f0-bebe-0dae2f7e1858")
              );
              loaderStore.setLoaderState(false);
              // this.fetchCategoriesTree();
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
