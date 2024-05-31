import { defineStore } from "pinia";
import {
  CreatePropertyValuePayload,
  GetPropertyValuePagedListPayload,
  PropertyValueApi,
  PropertyValueEntity,
  UpdatePropertyValuePayload,
} from "@/entities/property-value";
import { useLoaderStore } from "@/shared/store/loader";
import { useAlertStore } from "@/shared/store/alert";
import { container } from "tsyringe";
import { ResponseWithStatus, WithPagination } from "@/shared/api/api.types";
import { PropertyValueState } from "./types";
import { PropertyEntity } from "@/entities/property/model/PropertyEntity";

const propertyValueApiService = container.resolve(PropertyValueApi);

const NAME_ID = "property-value-store";

export const usePropertyValueStore = defineStore(NAME_ID, {
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
    getSelectedProperty(): PropertyEntity {
      return this.selectedProperty;
    },
  },
  actions: {
    fetchPropertyValueList(
      payload: GetPropertyValuePagedListPayload
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
      payload: CreatePropertyValuePayload[]
    ): Promise<ResponseWithStatus<PropertyValueEntity>[]> {
      return new Promise((resolve, reject) => {
        const loaderStore = useLoaderStore();
        const alertStore = useAlertStore();
        loaderStore.setLoaderState(true);
        propertyValueApiService
          .createPropertyValues(payload)
          .then((response) => {
            const items = response.map(
              (item: ResponseWithStatus<PropertyValueEntity>) => item.result
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
      payload: UpdatePropertyValuePayload[]
    ): Promise<ResponseWithStatus<PropertyValueEntity>[]> {
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
    fetchPropertyById(id: string) {
      return new Promise((resolve, reject) => {
        const loaderStore = useLoaderStore();
        const alertStore = useAlertStore();
        loaderStore.setLoaderState(true);
        propertyValueApiService
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
