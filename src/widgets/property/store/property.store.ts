import { defineStore } from "pinia";
import {
  CreatePropertyEntity,
  PropertyApi,
  PropertyEntity,
  PropertyEntityBaseResult,
  PropertyPageParams,
  UpdatePropertyEntity,
} from "@/entities/property";
import { useLoaderStore } from "@/shared/store/loader";
import { useAlertStore } from "@/shared/store/alert";
import { container } from "tsyringe";
import { AutocompleteEntity, WithPagination } from "@/shared/api/api.types";
import { PropertyState } from "./types";

const propertyApiService = container.resolve(PropertyApi);

export const usePropertyStore = defineStore("propertyStore", {
  state: (): PropertyState => {
    return {
      propertyList: [],
      propertyGroupListAutocomplete: [],
    };
  },
  getters: {
    getPropertyList(): PropertyEntity[] {
      return this.propertyList;
    },
    getPropertyGroupListAutocomplete(): AutocompleteEntity[] {
      return this.propertyGroupListAutocomplete;
    },
  },
  actions: {
    fetchPropertyGroupListAutocomplete(
      payload: PropertyPageParams
    ): Promise<AutocompleteEntity[]> {
      return new Promise((resolve, reject) => {
        const loaderStore = useLoaderStore();
        const alertStore = useAlertStore();
        loaderStore.setLoaderState(true);
        propertyApiService
          .getSubGroupProperties(payload)
          .then((response) => {
            this.propertyGroupListAutocomplete = response;
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
      payload: PropertyPageParams
    ): Promise<WithPagination<PropertyEntity>> {
      return new Promise((resolve, reject) => {
        const loaderStore = useLoaderStore();
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
    createPropertyList(
      payload: CreatePropertyEntity[]
    ): Promise<PropertyEntityBaseResult[]> {
      return new Promise((resolve, reject) => {
        const loaderStore = useLoaderStore();
        const alertStore = useAlertStore();
        loaderStore.setLoaderState(true);
        propertyApiService
          .createProperties(payload)
          .then((response) => {
            response.forEach((item) => {
              if (item.ok) {
                this.propertyList.unshift(item.result);
              }
            });
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
    updatePropertyList(
      payload: UpdatePropertyEntity[]
    ): Promise<PropertyEntityBaseResult[]> {
      return new Promise((resolve, reject) => {
        const loaderStore = useLoaderStore();
        const alertStore = useAlertStore();
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
