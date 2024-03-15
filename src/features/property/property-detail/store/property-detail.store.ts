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
import { WithPagination } from "@/shared/api/api.types";
import { IPropertyApi } from "../../property-list/property/api/property-api.types";

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
    fetchPropertyValueList(
      payload: IGetPropertyList
    ): Promise<WithPagination<IPropertyDetailApi>> {
      return new Promise((resolve, reject) => {
        const loaderStore = useLoaderStore();
        const alertStore = useAlertStore();
        loaderStore.setLoaderState(true);
        propertyDetailApiService
          .getPropertyValues(payload)
          .then((response) => {
            this.propertyValueList = response.items;
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
    createPropertyValue(
      payload: IPropertyValue
    ): Promise<IPropertyDetailApiWithWholeObject[]> {
      return new Promise((resolve, reject) => {
        const loaderStore = useLoaderStore();
        const alertStore = useAlertStore();
        loaderStore.setLoaderState(true);
        propertyDetailApiService
          .createPropertyValues(payload)
          .then((response) => {
            const items = response.map(
              (item: IPropertyDetailApiWithWholeObject) => item.result
            );
            const currentItems = this.propertyValueList.reverse();
            this.propertyValueList = [...currentItems, ...items];
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
    updatePropertyValue(
      payload: IPropertyValue
    ): Promise<IPropertyDetailApi[]> {
      return new Promise((resolve, reject) => {
        const loaderStore = useLoaderStore();
        const alertStore = useAlertStore();
        loaderStore.setLoaderState(true);
        propertyDetailApiService
          .updatePropertyValues(payload)
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
    fetchPropertyById(id: string): Promise<IPropertyApi> {
      return new Promise((resolve, reject) => {
        const loaderStore = useLoaderStore();
        const alertStore = useAlertStore();
        loaderStore.setLoaderState(true);
        propertyDetailApiService
          .getPropertyById(id)
          .then((response) => {
            this.selectedProperty = response;
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
