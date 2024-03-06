import { defineStore } from "pinia";
import {
  getSubGroupProperties,
  createProperties,
  getProperties,
  updateProperties,
} from "@/features/property/property-list/property/api";
import { IProperty } from "@/features/property/property-list/property/store/property.types";
import { useLoaderStore } from "@/shared/store/loader";
import { useAlertStore } from "@/shared/store/alert";

const loaderStore = useLoaderStore();
const alertStore = useAlertStore();

export const usePropertyStore = defineStore("propertyStore", {
  state: (): Partial<IProperty> => {
    return {
      propertyList: [],
      groupPropertyList: [],
    };
  },
  getters: {
    properties(): IProperty[] {
      return this.propertyList;
    },
    groupProperties(): any[] {
      return this.groupPropertyList;
    },
  },
  actions: {
    async fetchGroupProperties(data = {}) {
      try {
        loaderStore.setLoaderState(true);
        this.groupPropertyList = await getSubGroupProperties(data);
        loaderStore.setLoaderState(false);
        return true;
      } catch (err) {
        loaderStore.setLoaderState(false);
        if (err instanceof Error) {
          alertStore.showError(err.message);
        }
      }
    },
    async fetchPropertyList(payload: any = null) {
      try {
        loaderStore.setLoaderState(true);
        const response = await getProperties(payload);
        this.propertyList = response.items;
        loaderStore.setLoaderState(false);
      } catch (err) {
        loaderStore.setLoaderState(false);
        if (err instanceof Error) {
          alertStore.showError(err.message);
        }
      }
    },
    async createPropertyList(payload: any) {
      try {
        loaderStore.setLoaderState(true);
        const response = await createProperties(payload);
        const newItems = response.map((item: any) => item.result);
        this.propertyList = [...this.propertyList, ...newItems];
        loaderStore.setLoaderState(false);
        alertStore.showSuccess("Успешно добавлено!");
      } catch (err) {
        loaderStore.setLoaderState(false);
        if (err instanceof Error) {
          alertStore.showError(err.message);
        }
      }
    },
    async updatePropertyList(payload: any) {
      try {
        loaderStore.setLoaderState(true);
        await updateProperties(payload);
        loaderStore.setLoaderState(false);
        alertStore.showSuccess("Успешно обновлено!");
      } catch (err) {
        loaderStore.setLoaderState(false);
        if (err instanceof Error) {
          alertStore.showError(err.message);
        }
      }
    },
  },
});
