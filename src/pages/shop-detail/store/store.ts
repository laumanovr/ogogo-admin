import { defineStore } from "pinia";
import { DETAIL_STATUS, ShopDetailState } from "./types";

const NAME_ID = "shop-detail";

export const useShopDetailStore = defineStore(NAME_ID, {
  state: (): ShopDetailState => {
    return {
      logoStatus: DETAIL_STATUS.INITIAL,
      nameStatus: DETAIL_STATUS.INITIAL,
      descriptionStatus: DETAIL_STATUS.INITIAL,
      verifiedOrRejectedStatusBadge: false,
    };
  },
  getters: {
    getLogoStatus(): DETAIL_STATUS {
      return this.logoStatus;
    },
    getNameStatus(): DETAIL_STATUS {
      return this.nameStatus;
    },
    getDescriptionStatus(): DETAIL_STATUS {
      return this.descriptionStatus;
    },
    getVerifiedOrRejectedStatusBadge(): boolean {
      return this.verifiedOrRejectedStatusBadge;
    },
  },
  actions: {
    setLogoStatus(value: DETAIL_STATUS) {
      this.logoStatus = value;
    },
    setNameStatus(value: DETAIL_STATUS) {
      this.nameStatus = value;
    },
    setDescriptionStatus(value: DETAIL_STATUS) {
      this.descriptionStatus = value;
    },
    setVerifiedOrRejectedStatusBadge(value: boolean) {
      this.verifiedOrRejectedStatusBadge = value;
    },
  },
});
