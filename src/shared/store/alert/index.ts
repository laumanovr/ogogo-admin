import { defineStore } from "pinia";
import type { IAlert, AlertItem } from "./index.types";
import { v4 as uuid } from "uuid";
export const useAlertStore = defineStore("alert", {
  state: (): IAlert =>
    <IAlert>{
      items: [],
    },
  getters: {
    getAlertItems(): AlertItem[] {
      return this.items;
    },
  },
  actions: {
    showSuccess(message: string, timer: number = 2000) {
      this.items.push({
        id: uuid(),
        title: message,
        content: "",
        type: "success",
        timeout: timer,
      });
    },
    showError(message: string, timer: number = 2000) {
      this.items.push({
        id: uuid(),
        title: message,
        content: "",
        type: "error",
        timeout: timer,
      });
    },
    showInfo(message: string, timer: number = 2000) {
      this.items.push({
        id: uuid(),
        title: message,
        content: "",
        type: "info",
        timeout: timer,
      });
    },
    showWarning(message: string, timer: number = 2000) {
      this.items.push({
        id: uuid(),
        title: message,
        content: "",
        type: "warning",
        timeout: timer,
      });
    },
    closeAlert(id: string) {
      this.items = this.items.filter((item: any) => item.id !== id);
    },
  },
});
