import { defineStore } from "pinia";
import { container } from "tsyringe";
import { ShopState } from "./types";
import { ShopEntity } from "../model/types";
import { GetShopPagedListPayload, ShopApi, VerifyShopPayload } from "..";
import { WithResultPagination } from "@/shared/api/api.types";
import { useLoaderStore } from "@/shared/store/loader";
import { useAlertStore } from "@/shared/store/alert";

const NAME_ID = "shop-store";

const shopApiService = container.resolve(ShopApi);

export const useShopStore = defineStore(NAME_ID, {
  state: (): ShopState => {
    return {
      shopPagedList: {
        items: [],
        pageIndex: 0,
        pageSize: 10,
        totalCount: 0,
        totalPages: 0,
        indexFrom: 0,
        hasPreviousPage: false,
        hasNextPage: false,
      },
      openedShop: {
        id: null,
        name: null,
        logoBase64: null,
        logoFileName: null,
        logoFileSize: null,
        description: null,
        verificationStatus: null,
        moderatorId: null,
        moderatorName: null,
        moderationDate: null,
        moderationResult: {
          name: {
            isRejected: false,
            verified: false,
            userId: null,
            validateDateTime: null,
            validationComment: null,
          },
          logo: {
            isRejected: false,
            verified: false,
            userId: null,
            validateDateTime: null,
            validationComment: null,
          },
          description: {
            isRejected: false,
            verified: false,
            userId: null,
            validateDateTime: null,
            validationComment: null,
          },
        },
        version: null,
      },
      verifyInfo: {
        id: null,
        version: null,
        moderationResult: {
          name: {
            isRejected: false,
            verified: false,
            userId: null,
            validateDateTime: null,
            validationComment: null,
          },
          logo: {
            isRejected: false,
            verified: false,
            userId: null,
            validateDateTime: null,
            validationComment: null,
          },
          description: {
            isRejected: false,
            verified: false,
            userId: null,
            validateDateTime: null,
            validationComment: null,
          },
        },
      },
    };
  },
  getters: {
    getShopPagedList(): WithResultPagination<ShopEntity> {
      return this.shopPagedList;
    },
    getOpenedShop(): ShopEntity {
      return this.openedShop;
    },
    getShopInfoForVerify(): VerifyShopPayload {
      return this.verifyInfo;
    },
  },
  actions: {
    setVerifyInfoLogoComment(value: string) {
      this.verifyInfo.moderationResult.logo.validationComment = value;
    },
    setVerifyInfoNameComment(value: string) {
      this.verifyInfo.moderationResult.name.validationComment = value;
    },
    setVerifyInfoDescriptionComment(value: string) {
      this.verifyInfo.moderationResult.description.validationComment = value;
    },
    fetchShopPagedList(
      payload: GetShopPagedListPayload
    ): Promise<WithResultPagination<ShopEntity>> {
      return new Promise((resolve, reject) => {
        const loaderStore = useLoaderStore();
        const alertStore = useAlertStore();
        loaderStore.setLoaderState(true);
        shopApiService
          .getShopPagedList(payload)
          .then((response) => {
            this.shopPagedList = response;
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
    fetchShopById(id: string): Promise<ShopEntity> {
      return new Promise((resolve, reject) => {
        const loaderStore = useLoaderStore();
        const alertStore = useAlertStore();
        loaderStore.setLoaderState(true);
        shopApiService
          .getShopById(id)
          .then((response) => {
            this.openedShop = response;
            this.verifyInfo = {
              id: response.id,
              version: response.version,
              moderationResult: {
                logo: {
                  ...this.verifyInfo.moderationResult.logo,
                  ...response.moderationResult.logo,
                },
                name: {
                  ...this.verifyInfo.moderationResult.name,
                  ...response.moderationResult.name,
                },
                description: {
                  ...this.verifyInfo.moderationResult.description,
                  ...response.moderationResult.description,
                },
              },
            };
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
    verifyShop(): Promise<ShopEntity> {
      return new Promise((resolve, reject) => {
        const loaderStore = useLoaderStore();
        const alertStore = useAlertStore();
        loaderStore.setLoaderState(true);
        shopApiService
          .verifyShop(this.verifyInfo)
          .then((response) => {
            loaderStore.setLoaderState(false);
            this.openedShop = response;
            this.verifyInfo = {
              id: response.id,
              version: response.version,
              moderationResult: {
                logo: {
                  ...this.verifyInfo.moderationResult.logo,
                  ...response.moderationResult.logo,
                },
                name: {
                  ...this.verifyInfo.moderationResult.name,
                  ...response.moderationResult.name,
                },
                description: {
                  ...this.verifyInfo.moderationResult.description,
                  ...response.moderationResult.description,
                },
              },
            };
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
