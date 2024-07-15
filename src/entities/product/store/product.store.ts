import { defineStore } from "pinia";
import { container } from "tsyringe";
import { useLoaderStore } from "@/shared/store/loader";
import { useAlertStore } from "@/shared/store/alert";
import { IProductState } from "./product-store.types";
import { ProductApi } from "../api/product.api";
import {
  ProductPayload,
  ProductApiResponse,
  ProductStatusPayload,
} from "../api/product-api.types";
import {
  ProductEntity,
  ProductDetailEntity,
  ValidationField,
  ValidationFile,
} from "../model/types";
import { useShopStore } from "@/entities/shop";

const productApi = container.resolve(ProductApi);

export const useProductStore = defineStore("product-store", {
  state: (): IProductState => ({
    moderationProducts: [],
    totalCount: 0,
    selectedProduct: {
      validationDetails: {
        fields: {
          name: {},
          description: {},
          price: {},
          countOfProduct: {},
        },
        files: {
          photo: {},
          video: {},
        },
      },
    },
    verificationData: {
      id: "",
      verifierComment: "",
      validationDetails: {
        fields: {
          name: {
            validationComment: "",
            verified: false,
          },
          description: {
            validationComment: "",
            verified: false,
          },
          price: {
            validationComment: "",
            verified: false,
          },
          countOfProduct: {
            validationComment: "",
            verified: false,
          },
        },
        files: {
          photo: {
            validationComment: "",
            verified: false,
          },
          video: {
            validationComment: "",
            verified: false,
          },
        },
        properties: {},
      },
    },
  }),
  getters: {
    getModerationProductList(): ProductEntity[] {
      return this.moderationProducts;
    },
    getProductTotalCount(): number {
      return this.totalCount;
    },
    getSelectedProduct(): ProductDetailEntity {
      return this.selectedProduct;
    },
  },
  actions: {
    fetchModerationProducts(
      payload: ProductPayload
    ): Promise<ProductApiResponse> {
      return new Promise((resolve, reject) => {
        const loaderStore = useLoaderStore();
        const alertStore = useAlertStore();
        loaderStore.setLoaderState(true);
        productApi
          .getModerationProducts(payload)
          .then((response) => {
            this.moderationProducts = response.result.items;
            this.totalCount = response.result.totalCount;
            resolve(response);
          })
          .catch((err) => {
            alertStore.showError(err?.error?.errorMessage);
            reject(err);
          })
          .finally(() => {
            loaderStore.setLoaderState(false);
          });
      });
    },
    fetchProductById(id: string) {
      return new Promise((resolve, reject) => {
        const loaderStore = useLoaderStore();
        const alertStore = useAlertStore();
        loaderStore.setLoaderState(true);
        productApi
          .getProductById(id)
          .then((response) => {
            this.selectedProduct = response.result;
            resolve(response);
          })
          .catch((err) => {
            alertStore.showError(err?.error?.errorMessage);
            reject(err);
          })
          .finally(() => {
            loaderStore.setLoaderState(false);
          });
      });
    },
    fetchProductShopById(
      id: string
    ): Promise<{ name: string; logoBase64: string }> {
      return new Promise((resolve, reject) => {
        const shopStore = useShopStore();
        const loaderStore = useLoaderStore();
        const alertStore = useAlertStore();
        loaderStore.setLoaderState(true);
        shopStore
          .fetchShopById(id)
          .then((response) => {
            resolve(response);
          })
          .catch((err) => {
            alertStore.showError(err?.error?.errorMessage);
            reject(err);
          })
          .finally(() => {
            loaderStore.setLoaderState(false);
          });
      });
    },
    setFieldComment(field: keyof ValidationField, comment: string) {
      this.verificationData.validationDetails.fields[field].validationComment =
        comment;
      this.verificationData.validationDetails.fields[field].verified = true;
    },
    setFileComment(field: keyof ValidationFile, comment: string) {
      this.verificationData.validationDetails.files[field].validationComment =
        comment;
      this.verificationData.validationDetails.files[field].verified = true;
    },

    addVerifyComments(productId: string) {
      this.verificationData.id = productId;
      return new Promise((resolve, reject) => {
        const loaderStore = useLoaderStore();
        const alertStore = useAlertStore();
        loaderStore.setLoaderState(true);
        productApi
          .addValidationComments(this.verificationData)
          .then((response) => {
            alertStore.showSuccess("Отправлено на доработку!");
            resolve(response);
          })
          .catch((err) => {
            alertStore.showError(err?.error?.errorMessage);
            reject(err);
          })
          .finally(() => {
            loaderStore.setLoaderState(false);
          });
      });
    },
    publishProduct(payload: ProductStatusPayload) {
      return new Promise((resolve, reject) => {
        const loaderStore = useLoaderStore();
        const alertStore = useAlertStore();
        loaderStore.setLoaderState(true);
        productApi
          .setActiveStatus(payload)
          .then((response) => {
            alertStore.showSuccess("Успешно опубликовано!");
            resolve(response);
          })
          .catch((err) => {
            alertStore.showError(err?.error?.errorMessage);
            reject(err);
          })
          .finally(() => {
            loaderStore.setLoaderState(false);
          });
      });
    },
  },
});
