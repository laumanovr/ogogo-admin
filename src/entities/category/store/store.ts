import { defineStore } from "pinia";
import { container } from "tsyringe";
import { CategoryApi } from "../api/CategoryApi";
import { CategoryState } from "./types";
import {
  AllowedValue,
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

const NAME_ID = "category";

export const useCategoryStore = defineStore(NAME_ID, {
  state: (): CategoryState => {
    return {
      categoryName: null,
      categoryNameKy: null,
      categoryNameEn: null,
      icoBase64: null,
      imageId: null,
      properties: [],
      selectedCategory: null,
      mode: "",
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
      this.selectedCategory = null;
      this.mode = "create";
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
    setMode(mode: string) {
      this.mode = mode;
    },

    setPropertyAllowedValueObj(
      propValues: PropertyValueAutocomplete[],
      propId: string
    ) {
      this.properties = this.properties.map((property) => {
        if (property.propertyId === propId) {
          property.allowedValues = propValues;
        }
        return property;
      });
    },

    setDeletePropertyAllowedValueObj(
      obj: PropertyValueAutocomplete | AllowedValue,
      propId: string
    ) {
      this.properties = this.properties.map((property) => {
        if (property.propertyId === propId) {
          property.allowedValues = property.allowedValues.filter((item) => {
            if ("id" in item && "id" in obj) {
              return item.id !== obj.id;
            }
          });
        }
        return property;
      });
    },

    removePropertyCard(propId: string) {
      this.properties = this.properties.filter(
        (property) => property.propertyId !== propId
      );
    },

    fetchCategoryById(
      id: string,
      selectedProduct: any
    ): Promise<CategoryEntity> {
      return new Promise((resolve, reject) => {
        categoryApiService
          .getCategoryById(id)
          .then((response) => {
            this.properties = response.properties;
            this.selectedCategory = response;
            this.setTranslation(response.categoryName, "ru");
            this.setTranslation(response.categoryNameKy, "ky");
            this.setTranslation(response.categoryNameEn, "en");
            this.setIcoBase64(response.icoBase64);
            this.setImageId(response.imageId);
            this.setCategoryId(response.id);
            this.setMode("update");
            if (selectedProduct) {
              const selectedPropValues: any = [];
              Object.entries(selectedProduct.properties).forEach((item) => {
                selectedPropValues.push({ key: item[0], valueId: item[1] });
              });
              this.properties = this.properties.map((property: any) => {
                const selectedObj = selectedPropValues.find(
                  (item: any) => item.key === property.key
                );
                property.selectedValueId = selectedObj?.valueId;
                return property;
              });
            }
            if (response.imageId) {
              this.fetchFileById(response.imageId);
            } else {
              this.file = null;
            }
            resolve(response);
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
            const multidimensionalArray = (
              array: CategoryTreeEntity[] | CategoryModified[]
            ): CategoryTreeEntity[] | CategoryModified[] => {
              return array.map((obj: CategoryTreeEntity | CategoryModified) => {
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

    fetchFileById(id: string) {
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
          });
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

    saveCategorySettings(): Promise<string> {
      let { t } = i18n.global;
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
        id: "",
        parentId: "",
        categoryName: this.getRu ?? "",
        categoryNameKy: this.getKy,
        categoryNameEn: this.getEn,
        imageId: this.getImageId,
        icoBase64: this.getIcoBase64,
        properties: popertiesModified,
        sequenceNumber: this.selectedCategory?.sequenceNumber ?? 0,
      };
      if (this.mode === "create") {
        payload.parentId = this.selectedCategory?.id || null;
        delete payload.id;
      } else {
        payload.id = this.selectedCategory?.id;
        payload.parentId = this.selectedCategory?.parentId || null;
      }
      return new Promise((resolve, reject) => {
        if (this.mode === "create") {
          categoryApiService
            .createCategory(payload)
            .then((res) => {
              this.setId(res.id);
              this.fetchCategoryById(res.id, "");
              this.fetchCategoriesTree();
              resolve(t("lang-5fa5d291-8d85-49f0-bebe-0dae2f7e1858"));
            })
            .catch((err) => {
              reject(err);
            });
        } else {
          categoryApiService
            .updateCategory(payload)
            .then(() => {
              this.fetchCategoriesTree();
              resolve(t("lang-b4f39135-e5f9-41cb-b086-87820e991410"));
            })
            .catch((err) => {
              reject(err);
            });
        }
      });
    },
  },
});
