import { defineStore } from "pinia";
import { DETAIL_STATUS, ShopDetailState } from "./types";

const NAME_ID = "shop-detail-store";

export const useShopDetailStore = defineStore(NAME_ID, {
  state: (): ShopDetailState => {
    return {
      logoStatus: DETAIL_STATUS.INITIAL,
      nameStatus: DETAIL_STATUS.INITIAL,
      descriptionStatus: DETAIL_STATUS.INITIAL,
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
  },
});
