import { defineStore } from "pinia";

import type { IAlertState, IAlert } from "./index.types";

export const useAlertStore = defineStore("alert", {
  state(): IAlertState {
    return {
      topLeft: [],
      topRight: [],
      bottomLeft: [],
      bottomRight: [],
      top: [],
      bottom: [],
      left: [],
      right: [],
      center: [],
    };
  },
  getters: {
    getTopLeft(): IAlert[] {
      return this.topLeft;
    },
    getTopRight(): IAlert[] {
      return this.topRight;
    },
    getBottomLeft(): IAlert[] {
      return this.bottomLeft;
    },
    getBottomRight(): IAlert[] {
      return this.bottomRight;
    },
    getTop(): IAlert[] {
      return this.top;
    },
    getBottom(): IAlert[] {
      return this.bottom;
    },
    getLeft(): IAlert[] {
      return this.left;
    },
    getRight(): IAlert[] {
      return this.right;
    },
    getCenter(): IAlert[] {
      return this.center;
    },
  },
  actions: {
    clearAlerts() {
      this.topLeft = [];
      this.topRight = [];
      this.bottomLeft = [];
      this.bottomRight = [];
      this.top = [];
      this.bottom = [];
      this.left = [];
      this.right = [];
      this.center = [];
    },
  },
});
