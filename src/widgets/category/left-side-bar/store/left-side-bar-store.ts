import { defineStore } from "pinia";

import { ILeftSideBarState } from "./left-side-bar-store.types";

export const useLeftSideBarStore = defineStore("left-side-bar-store", {
  state: (): ILeftSideBarState => {
    return {};
  },
  getters: {
    getCategoryName(): string {
      return "";
    },
  },
  actions: {},
});
