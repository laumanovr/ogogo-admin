import { defineStore } from "pinia";
import { container } from "tsyringe";
import { useLoaderStore } from "@/shared/store/loader";
import { useAlertStore } from "@/shared/store/alert";
import { IProductState } from "./product-store.types";
import { ProductApi } from "../api/product.api";
import { ProductPayload, ProductApiResponse } from "../api/product-api.types";

const productApi = container.resolve(ProductApi);
const loaderStore = useLoaderStore();
const alertStore = useAlertStore();

export const useProductStore = defineStore("product-store", {
  state: (): IProductState => ({
    moderationProducts: [],
  }),
  actions: {
    fetchModerationProducts(
      payload: ProductPayload
    ): Promise<ProductApiResponse> {
      return new Promise((resolve, reject) => {
        loaderStore.setLoaderState(true);
        productApi
          .getModerationProducts(payload)
          .then((response) => {
            loaderStore.setLoaderState(false);
            this.moderationProducts = response.result.items;
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
