import {
  IPropertyDetailApi,
  IPropertyDetailApiWithWholeObject,
} from "../api/property-detail-api.types";
import { defineStore } from "pinia";
import { IPropertyValue, IGetPropertyList } from "./property-detail.types";
import { PropertyDetailApi } from "@/features/property/property-detail/api/property-detail.api";
import { useLoaderStore } from "@/shared/store/loader";
import { useAlertStore } from "@/shared/store/alert";
import { container } from "tsyringe";

const loaderStore = useLoaderStore();
const alertStore = useAlertStore();
const propertyDetailApiService = container.resolve(PropertyDetailApi);

export const usePropertyDetailStore = defineStore("property-detail-store", {
  state: (): Partial<IPropertyValue> => ({
    propertyValueList: [],
    selectedProperty: null,
  }),
  getters: {
    propertyValues(): IPropertyDetailApi[] {
      return this.propertyValueList;
    },
  },
  actions: {
    async fetchPropertyValueList(payload: IGetPropertyList) {
      try {
        loaderStore.setLoaderState(true);
        const response = await propertyDetailApiService.getPropertyValues(payload);
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
        const response = await propertyDetailApiService.createPropertyValues(payload);
        const items = response.map(
          (item: IPropertyDetailApiWithWholeObject) => item.result
        );
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
        await propertyDetailApiService.updatePropertyValues(payload);
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
        this.selectedProperty = await propertyDetailApiService.getPropertyById(id);
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
