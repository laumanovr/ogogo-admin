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
      },
      verifyInfo: {
        id: null,
        moderationResult: null,
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
              moderationResult: response.moderationResult,
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
  },
});
