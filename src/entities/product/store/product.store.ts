import { defineStore } from "pinia";
import { container } from "tsyringe";
import { useLoaderStore } from "@/shared/store/loader";
import { useAlertStore } from "@/shared/store/alert";
import { IProductState } from "./product-store.types";
import { ProductApi } from "../api/product.api";
import { ProductPayload, ProductApiResponse } from "../api/product-api.types";
import {
  ProductEntity,
  ProductDetailEntity,
  ValidationField,
} from "../model/types";
import { useShopStore } from "@/entities/shop";

const productApi = container.resolve(ProductApi);

export const useProductStore = defineStore("product-store", {
  state: (): IProductState => ({
    moderationProducts: [],
    totalCount: 0,
    selectedProduct: {},
    verificationData: {},
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
            loaderStore.setLoaderState(false);
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
            loaderStore.setLoaderState(false);
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
    saveValidationCommentForField(field: keyof ValidationField, value: string) {
      this.verificationData.validationDetails.fields[field].validationComment =
        value;
      // productApi.addValidationComment
    },
  },
});
