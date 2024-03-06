import { defineStore } from "pinia";

import type { IAlert } from "./index.types";

export const useAlertStore = defineStore("alert", {
  state: (): IAlert =>
    <IAlert>{
      successMessage: null,
      errorMessage: null,
      infoMessage: null,
    },
  getters: {},
  actions: {
    showSuccess(message: string) {
      this.successMessage = message;
      this.clearAlerts("successMessage");
    },
    showError(message: string) {
      this.errorMessage = message;
      this.clearAlerts("errorMessage");
    },
    showInfo(message: string) {
      this.infoMessage = message;
      this.clearAlerts("infoMessage");
    },
    clearAlerts(field: string = null) {
      if (field) {
        setTimeout(() => {
          this[field] = null;
        }, 800);
      }
    },
  },
});
