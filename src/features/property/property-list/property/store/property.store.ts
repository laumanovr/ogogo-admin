import { IGetGroupPropertyList } from "./../../group-property/store/group-property.types";
import { IGetPropertyList } from "./../../../property-list/property/store/property.types";
import { defineStore } from "pinia";
import {
  getSubGroupProperties,
  createProperties,
  getProperties,
  updateProperties,
} from "@/features/property/property-list/property/api/property.api";
import { IProperty } from "@/features/property/property-list/property/store/property.types";
import { useLoaderStore } from "@/shared/store/loader";
import { useAlertStore } from "@/shared/store/alert";
import {
  IPropertyApi,
  IPropertyWithWholeObject,
} from "../api/property-api.types";
import { IGroupPropertyApi } from "../../group-property/api/group-property-api.types";

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
    properties(): IPropertyApi[] {
      return this.propertyList;
    },
    groupProperties(): IGroupPropertyApi[] {
      return this.groupPropertyList;
    },
  },
  actions: {
    async fetchGroupProperties(data: IGetGroupPropertyList) {
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
    async fetchPropertyList(payload: IGetPropertyList) {
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
    async createPropertyList(payload: IPropertyApi) {
      try {
        loaderStore.setLoaderState(true);
        const response = await createProperties(payload);
        const newItems = response.map(
          (item: IPropertyWithWholeObject) => item.result
        );
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
    async updatePropertyList(payload: IPropertyApi) {
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
