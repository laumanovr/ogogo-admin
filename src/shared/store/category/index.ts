// import { defineStore } from "pinia";
// import { ICategory, ICategorySharedState } from "./index.types";
// import { CategoryApi } from "@/shared/api/category";
// import {
//   ICategorySettings,
//   PropertyValueAutocomplete,
// } from "@/shared/api/category/index.types";
// import { container } from "tsyringe";
// import { FileApi } from "@/shared/api/file";
// import { Mode } from "@/shared/lib/utils/enums";
// import { useAuthStore } from "../auth";
// import { Property } from "@/widgets/category/category-settings/store/category-settings-store.types";
// import { findObjectInMultidimensionalArray } from "@/entities/category/utils/findObjectInMultidimensionalArray";

// const categoryApiService = container.resolve(CategoryApi);

// const fileApiService = container.resolve(FileApi);

// export const useCategorySharedStore = defineStore("category-shared-store", {
//   state: (): ICategorySharedState => {
//     return {
//       categories: [
//         {
//           categoryName: "lang-b14d63cd-580a-4645-8c82-860175a3830f",
//           childMarketplaceCategoryIdList: [],
//           active: true,
//           icon: null,
//           id: null,
//           sequenceNumber: null,
//         },
//       ],
//       categoryIcon: null,
//       categoryHasChanged: false,

//       categoryById: null,

//       imageId: null,

//       icoBase64: null,

//       file: null,
//       contentType: null,
//       fileName: null,

//       categoryId: null,

//       namingFields: {
//         ru: null,
//         en: null,
//         ky: null,
//       },
//       properties: [],
//       propertyValueAutocomplete: [],
//       mode: null,

//       sequenceNumber: null,
//     };
//   },
//   getters: {
//     getCategories(): ICategory[] {
//       return this.categories;
//     },
//     getCategoryHasChanged(): boolean {
//       return this.categoryHasChanged;
//     },
//     getCategoryById(): ICategorySettings {
//       return this.categoryById;
//     },
//     getRu(): string {
//       return this.namingFields.ru;
//     },
//     getEn(): string {
//       return this.namingFields.en;
//     },
//     getKy(): string {
//       return this.namingFields.ky;
//     },
//     getImageId(): string {
//       return this.imageId;
//     },
//     getIcoBase64(): string | ArrayBuffer {
//       return this.icoBase64;
//     },

//     getFile(): string | File {
//       return this.file;
//     },

//     getMode(): Mode {
//       return this.mode;
//     },
//     getCategoryId(): string {
//       return this.categoryId;
//     },
//     getProperties(): Property[] {
//       return this.properties;
//     },
//     getSequenceNumber(): number {
//       return this.sequenceNumber;
//     },
//     getPropertyValueAutocomplete(): PropertyValueAutocomplete[] {
//       return this.propertyValueAutocomplete;
//     },
//   },
//   actions: {
//     setId(value: string) {
//       const payload = {
//         ...this.categories[0],
//         id: value,
//       };

//       this.categories[0] = payload;
//     },
//     setAddCategory(value: ICategory) {
//       this.categories.push(value);
//     },
//     setCategories(value: ICategory[]) {
//       this.categories = value;
//     },
//     setCategoryIcon(value: string) {
//       const foundCategory = findObjectInMultidimensionalArray(
//         this.categories,
//         "active"
//       );

//       foundCategory.icon = value;
//     },
//     setCategoryHasChanged(value: boolean) {
//       this.categoryHasChanged = value;
//     },
//     setTranslation(value: string, key: string) {
//       if (key === "ru") {
//         this.namingFields.ru = value;
//       } else if (key === "ky") {
//         this.namingFields.ky = value;
//       } else if (key === "en") {
//         this.namingFields.en = value;
//       }
//     },
//     setImageId(value: string) {
//       this.imageId = value;
//     },
//     setIcoBase64(value: string | ArrayBuffer) {
//       this.icoBase64 = value;
//     },

//     setMode(value: Mode) {
//       this.mode = value;
//     },
//     setCategoryId(value: string) {
//       this.categoryId = value;
//     },

//     setFile(value: string | File) {
//       this.file = value;
//     },

//     setProperties(value: Property) {
//       this.properties.push(value);
//     },
//     setSequenceNumber(value: number) {
//       this.sequenceNumber = value;
//     },

//     setPropertyAllowedValue(
//       arr: { propertyValueId: string }[],
//       propertyId: string
//     ) {
//       const foundProperty = this.getProperties.find((el) => {
//         return el.propertyId === propertyId;
//       });

//       foundProperty.allowedValues = arr;
//     },
//     setPropertyAllowedValueObj(
//       obj: { propertyValueId: string } | PropertyValueAutocomplete,
//       propertyId: string
//     ) {
//       const foundProperty = this.getProperties.find((el) => {
//         return el.propertyId === propertyId;
//       });

//       foundProperty.allowedValues.push(obj);
//     },

//     setDeletePropertyAllowedValueObj(
//       obj: { propertyValueId: string } | PropertyValueAutocomplete,
//       propertyId: string
//     ) {
//       const foundProperty = this.getProperties.find((el) => {
//         return el.propertyId === propertyId;
//       });
//       foundProperty.allowedValues = foundProperty.allowedValues.filter((el) => {
//         if ("id" in el && "id" in obj) {
//           return el.id !== obj.id;
//         }
//       });
//     },

//     setPropertyValueAutocomplete(value: PropertyValueAutocomplete[]) {
//       this.propertyValueAutocomplete = value;
//     },

//     fetchFileById(id: string): Promise<any> {
//       return new Promise((resolve, reject) => {
//         const authStore = useAuthStore();

//         const sessionId = authStore.getSessionId;

//         fileApiService
//           .getFileById(id, sessionId)
//           .then((result) => {
//             const imageUrl = URL.createObjectURL(result);

//             this.file = imageUrl;
//             resolve(result);
//           })
//           .catch((err) => {
//             reject(err);
//           })
//           .finally(() => {});
//       });
//     },

//     fetchPropertiesListAutocomplete(propertyId: string) {
//       return new Promise((resolve, reject) => {
//         categoryApiService
//           .getPropertyValueAutocomplete({
//             pageIndex: 0,
//             pageSize: 10000,
//             queryParams: {
//               propertyId: propertyId,
//             },
//           })
//           .then((data) => {
//             this.propertyValueAutocomplete = data;
//             resolve(data);
//           })
//           .catch((err) => {
//             reject(err);
//           });
//       });
//     },

//     fetchCategoryById(id: string): Promise<ICategorySettings> {
//       return new Promise((resolve, reject) => {
//         categoryApiService
//           .getCategoryById(id)
//           .then((res) => {
//             this.setTranslation(res.categoryName, "ru");
//             this.setTranslation(res.categoryNameKy, "ky");
//             this.setTranslation(res.categoryNameEn, "en");
//             this.setIcoBase64(res.icoBase64);
//             this.setImageId(res.imageId);

//             this.setCategoryId(res.id);

//             this.properties = res.properties;

//             if (res.imageId) {
//               // set image to show in category image preview
//               this.fetchFileById(res.imageId);
//             } else {
//               // clear rile if there is no image
//               this.file = null;
//             }
//             resolve(res);
//           })
//           .catch((err) => {
//             reject(err);
//           });
//       });
//     },
//   },
// });
