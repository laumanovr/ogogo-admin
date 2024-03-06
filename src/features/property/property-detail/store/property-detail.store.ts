import { defineStore } from "pinia";
import { IPropertyValue } from "./property-detail.types";
import {
  createPropertyValues,
  updatePropertyValues,
  getPropertyValues,
  getPropertyById,
} from "@/features/property/property-detail/api/property-detail.api";
import { useLoaderStore } from "@/shared/store/loader";
import { useAlertStore } from "@/shared/store/alert";

const loaderStore = useLoaderStore();
const alertStore = useAlertStore();

export const usePropertyDetailStore = defineStore("property-detail-store", {
  state: (): Partial<IPropertyValue> => ({
    propertyValueList: [],
    selectedProperty: null,
  }),
  getters: {
    propertyValues(): IPropertyValue[] {
      return this.propertyValueList;
    },
  },
  actions: {
    async fetchPropertyValueList(payload: any) {
      try {
        loaderStore.setLoaderState(true);
        const response = await getPropertyValues(payload);
        this.propertyValueList = response.items;
        loaderStore.setLoaderState(false);
      } catch (err) {
        if (err instanceof Error) {
          alertStore.showError(err.message);
        }
        loaderStore.setLoaderState(false);
      }
    },
    async createPropertyValue(payload: IPropertyValue) {
      try {
        loaderStore.setLoaderState(true);
        const response = await createPropertyValues(payload);
        const items = response.map((item: any) => item.result);
        const currentItems = this.propertyValueList.reverse();
        this.propertyValueList = [...currentItems, ...items];
        loaderStore.setLoaderState(false);
        alertStore.showSuccess("Успешно добавлено!");
      } catch (err) {
        if (err instanceof Error) {
          alertStore.showError(err.message);
        }
        loaderStore.setLoaderState(false);
      }
    },
    async updatePropertyValue(payload: IPropertyValue) {
      try {
        loaderStore.setLoaderState(true);
        await updatePropertyValues(payload);
        loaderStore.setLoaderState(false);
        alertStore.showSuccess("Успешно обновлено!");
      } catch (err) {
        if (err instanceof Error) {
          alertStore.showError(err.message);
        }
        loaderStore.setLoaderState(false);
      }
    },

    async fetchPropertyById(id: string) {
      try {
        loaderStore.setLoaderState(true);
        this.selectedProperty = await getPropertyById(id);
        loaderStore.setLoaderState(false);
      } catch (err) {
        if (err instanceof Error) {
          alertStore.showError(err.message);
        }
        loaderStore.setLoaderState(false);
      }
    },
  },
});
