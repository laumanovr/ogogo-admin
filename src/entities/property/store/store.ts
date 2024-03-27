import { defineStore } from "pinia";
import {
  CreatePropertyPayload,
  GetPropertyPagedListPayload,
  GetSubGroupPropertiesPayload,
  PropertyApi,
  PropertyEntity,
  UpdatePropertyPayload,
} from "@/entities/property";
import { useLoaderStore } from "@/shared/store/loader";
import { useAlertStore } from "@/shared/store/alert";
import { container } from "tsyringe";
import {
  AutocompleteEntity,
  ResponseWithStatus,
  WithPagination,
} from "@/shared/api/api.types";
import { PropertyState } from "./types";

const propertyApiService = container.resolve(PropertyApi);

const NAME_ID = "propertyStore";

export const usePropertyStore = defineStore(NAME_ID, {
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
      payload: GetSubGroupPropertiesPayload
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
      payload: GetPropertyPagedListPayload
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
      payload: CreatePropertyPayload[]
    ): Promise<ResponseWithStatus<PropertyEntity>[]> {
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
      payload: UpdatePropertyPayload[]
    ): Promise<ResponseWithStatus<PropertyEntity>[]> {
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
