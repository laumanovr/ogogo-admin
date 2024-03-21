import { defineStore } from "pinia";
import { useLoaderStore } from "@/shared/store/loader";
import { container } from "tsyringe";
import { useAlertStore } from "@/shared/store/alert";
import { SortDirectionEnum, WithPagination } from "@/shared/api/api.types.ts";
import {
  PropertyGroupEntityBaseResult,
  PropertyGroupApi,
  PropertyGroupEntity,
  PropertyGroupPageParams,
  CreatePropertyGroupEntity,
  UpdatePropertyGroupEntity,
} from "@/entities/property-group";
import { PropertyGroupState } from "./types";

const propertyGroupApiService = container.resolve(PropertyGroupApi);

export const usePropertyGroupStore = defineStore("property-group-store", {
  state: (): PropertyGroupState => {
    return {
      propertyGroupList: [],
    };
  },
  getters: {
    getPropertyGroupList(): PropertyGroupEntity[] {
      return this.propertyGroupList;
    },
  },
  actions: {
    fetchGroupPropertyList(
      payload: PropertyGroupPageParams
    ): Promise<WithPagination<PropertyGroupEntity>> {
      return new Promise((resolve, reject) => {
        const loaderStore = useLoaderStore();
        const alertStore = useAlertStore();
        loaderStore.setLoaderState(true);
        propertyGroupApiService
          .getGroupProperties(payload)
          .then((response) => {
            this.propertyGroupList = response?.items;
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
    createGroupProperty(
      payload: CreatePropertyGroupEntity[]
    ): Promise<PropertyGroupEntityBaseResult[]> {
      return new Promise((resolve, reject) => {
        const loaderStore = useLoaderStore();
        const alertStore = useAlertStore();
        loaderStore.setLoaderState(true);
        propertyGroupApiService
          .createGroupProperties(payload)
          .then((response) => {
            response.forEach((item) => {
              if (item.ok) {
                this.propertyGroupList.unshift(item.result);
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
    updateGroupProperty(
      payload: UpdatePropertyGroupEntity[]
    ): Promise<PropertyGroupEntityBaseResult[]> {
      return new Promise((resolve, reject) => {
        const loaderStore = useLoaderStore();
        const alertStore = useAlertStore();
        loaderStore.setLoaderState(true);
        propertyGroupApiService
          .updateGroupProperties(payload)
          .then((response) => {
            this.fetchGroupPropertyList({
              pageSize: 500,
              sortDirection: SortDirectionEnum.ASCENDING,
              queryParams: null,
              pageIndex: 0,
            });
            loaderStore.setLoaderState(false);
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
