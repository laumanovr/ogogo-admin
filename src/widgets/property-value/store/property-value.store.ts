import { defineStore } from "pinia";
import {
  CreatePropertyValueEntity,
  PropertyValueApi,
  PropertyValueEntity,
  PropertyValueEntityBaseResult,
  PropertyValuePageParams,
} from "@/entities/property-value";
import { useLoaderStore } from "@/shared/store/loader";
import { useAlertStore } from "@/shared/store/alert";
import { container } from "tsyringe";
import { WithPagination } from "@/shared/api/api.types";
import { PropertyValueState } from "./types";

const propertyValueApiService = container.resolve(PropertyValueApi);

export const usePropertyValueStore = defineStore("property-value-store", {
  state: (): PropertyValueState => {
    return {
      propertyValueList: [],
      selectedProperty: null,
    };
  },
  getters: {
    getPropertyValueList(): PropertyValueEntity[] {
      return this.propertyValueList;
    },
  },
  actions: {
    fetchPropertyValueList(
      payload: PropertyValuePageParams
    ): Promise<WithPagination<PropertyValueEntity>> {
      return new Promise((resolve, reject) => {
        const loaderStore = useLoaderStore();
        const alertStore = useAlertStore();
        loaderStore.setLoaderState(true);
        propertyValueApiService
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
      payload: CreatePropertyValueEntity[]
    ): Promise<PropertyValueEntityBaseResult[]> {
      return new Promise((resolve, reject) => {
        const loaderStore = useLoaderStore();
        const alertStore = useAlertStore();
        loaderStore.setLoaderState(true);
        propertyValueApiService
          .createPropertyValues(payload)
          .then((response) => {
            const items = response.map(
              (item: PropertyValueEntityBaseResult) => item.result
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
      payload: PropertyValueEntity[]
    ): Promise<PropertyValueEntityBaseResult[]> {
      return new Promise((resolve, reject) => {
        const loaderStore = useLoaderStore();
        const alertStore = useAlertStore();
        loaderStore.setLoaderState(true);
        propertyValueApiService
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
    // fetchPropertyById(id: string): Promise<IPropertyApi> {
    //   return new Promise((resolve, reject) => {
    //     const loaderStore = useLoaderStore();
    //     const alertStore = useAlertStore();
    //     loaderStore.setLoaderState(true);
    //     propertyValueApiService
    //       .getPropertyById(id)
    //       .then((response) => {
    //         this.selectedProperty = response;
    //         resolve(response);
    //       })
    //       .catch((err) => {
    //         alertStore.showError(err.message);
    //         reject(err);
    //       })
    //       .finally(() => {
    //         loaderStore.setLoaderState(false);
    //       });
    //   });
    // },
  },
});
