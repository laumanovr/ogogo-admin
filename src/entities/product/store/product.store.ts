import { defineStore } from "pinia";
import { container } from "tsyringe";
import i18n from "@/shared/lib/plugins/i18n";
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

export const useProductStore = defineStore("product", {
  state: (): IProductState => ({
    moderationProducts: [],
    totalCount: 0,
    selectedProductShop: {},
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
    getSelectedProductShop(): any {
      return this.selectedProductShop;
    },
  },
  actions: {
    fetchModerationProducts(
      payload: ProductPayload
    ): Promise<ProductApiResponse> {
      return new Promise((resolve, _) => {
        productApi.getModerationProducts(payload).then((response) => {
          this.moderationProducts = response.result.items;
          this.totalCount = response.result.totalCount;
          resolve(response);
        });
      });
    },
    fetchProductById(id: string) {
      return new Promise((resolve, _) => {
        productApi.getProductById(id).then((response) => {
          this.selectedProduct = response.result;
          resolve(response);
        });
      });
    },
    fetchProductShopById(
      id: string
    ): Promise<{ name: string; logoBase64: string }> {
      return new Promise((resolve, _) => {
        const shopStore = useShopStore();
        shopStore.fetchShopById(id).then((response) => {
          this.selectedProductShop = response;
          resolve(response);
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

    addVerifyComments(productId: string): Promise<string> {
      this.verificationData.id = productId;
      return new Promise((resolve, _) => {
        productApi.addValidationComments(this.verificationData).then(() => {
          resolve(i18n.global.t("lang-b862d2de-20b0-48c6-b639-713b22ead7d0"));
        });
      });
    },
    publishProduct(payload: ProductStatusPayload): Promise<string> {
      return new Promise((resolve, _) => {
        productApi.setActiveStatus(payload).then(() => {
          resolve(i18n.global.t("lang-b986ed5e-0f8c-4cd1-ad42-3806144544be"));
        });
      });
    },
  },
});
