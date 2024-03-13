import { IGetGroupPropertyList } from "./../../group-property/store/group-property.types";
import { IGetPropertyList } from "./../../../property-list/property/store/property.types";
import { defineStore } from "pinia";
import { PropertyApi } from "@/features/property/property-list/property/api/property.api";
import { IProperty } from "@/features/property/property-list/property/store/property.types";
import { useLoaderStore } from "@/shared/store/loader";
import { useAlertStore } from "@/shared/store/alert";
import {
  IPropertyApi,
  IPropertyWithWholeObject,
} from "../api/property-api.types";
import { IGroupPropertyApi } from "../../group-property/api/group-property-api.types";
import { container } from "tsyringe";
import { WithPagination } from "@/shared/api/api.types";

const loaderStore = useLoaderStore();
const alertStore = useAlertStore();

const propertyApiService = container.resolve(PropertyApi);

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
    fetchGroupProperties(
      data: IGetGroupPropertyList
    ): Promise<IGroupPropertyApi[]> {
      return new Promise((resolve, reject) => {
        loaderStore.setLoaderState(true);
        propertyApiService
          .getSubGroupProperties(data)
          .then((response) => {
            this.groupPropertyList = response;
            loaderStore.setLoaderState(false);
            resolve(response);
          })
          .catch((err) => {
            alertStore.showError(err.message);
            reject(err);
          })
          .finally(() => {
            loaderStore.setLoaderState(false);
          });
      });
    },
    fetchPropertyList(
      payload: IGetPropertyList
    ): Promise<WithPagination<IPropertyApi>> {
      return new Promise((resolve, reject) => {
        loaderStore.setLoaderState(true);
        propertyApiService
          .getProperties(payload)
          .then((response) => {
            this.propertyList = response.items;
            loaderStore.setLoaderState(false);
            resolve(response);
          })
          .catch((err) => reject(err))
          .finally(() => {
            loaderStore.setLoaderState(false);
          });
      });
    },
    createPropertyList(payload: IPropertyApi) {
      return new Promise((resolve, reject) => {
        loaderStore.setLoaderState(true);
        propertyApiService
          .createProperties(payload)
          .then((response) => {
            const newItems = response.map(
              (item: IPropertyWithWholeObject) => item.result
            );
            this.propertyList = [...this.propertyList, ...newItems];
            loaderStore.setLoaderState(false);
            alertStore.showSuccess("Успешно добавлено!");
            resolve(response);
          })
          .catch((err) => {
            alertStore.showError(err.message);
            reject(err);
          })
          .finally(() => {
            loaderStore.setLoaderState(false);
          });
      });
    },
    updatePropertyList(payload: IPropertyApi) {
      return new Promise((resolve, reject) => {
        loaderStore.setLoaderState(true);
        propertyApiService
          .updateProperties(payload)
          .then((response) => {
            alertStore.showSuccess("Успешно обновлено!");
            resolve(response);
          })
          .catch((err) => {
            alertStore.showError(err.message);
            reject(err);
          })
          .finally(() => {
            loaderStore.setLoaderState(false);
          });
      });
    },
  },
});
