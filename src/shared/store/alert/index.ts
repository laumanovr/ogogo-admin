import { defineStore } from "pinia";

import type { IAlert } from "./index.types";

export const useAlertStore = defineStore("alert", {
    state: ():IAlert => <IAlert>({
        successMessage: null,
        errorMessage: null,
        infoMessage: null
    }),
    getters: {},
    actions: {
        showSuccess(message) {
            this.successMessage = message;
            this.clearAlerts("successMessage");
        },
        showError(message) {
            this.errorMessage = message;
            this.clearAlerts("errorMessage");
        },
        showInfo(message) {
            this.infoMessage = message;
            this.clearAlerts("infoMessage");
        },
        clearAlerts(field) {
            setTimeout(() => {
                this[field] = null;
            }, 800);
        },
    },
});
