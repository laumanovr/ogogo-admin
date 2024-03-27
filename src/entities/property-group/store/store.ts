import { defineStore } from "pinia";
import { useLoaderStore } from "@/shared/store/loader";
import { container } from "tsyringe";
import { useAlertStore } from "@/shared/store/alert";
import {
  ResponseWithStatus,
  SORT_DIRECTION_ENUM,
  WithPagination,
} from "@/shared/api/api.types.ts";
import {
  CreatePropertyGroupPayload,
  GetPropertyGroupPagedListPayload,
  PropertyGroupApi,
  PropertyGroupEntity,
  UpdatePropertyGroupPayload,
} from "@/entities/property-group";
import { PropertyGroupState } from "./types";

const propertyGroupApiService = container.resolve(PropertyGroupApi);

const NAME_ID = "property-group-store";

export const usePropertyGroupStore = defineStore(NAME_ID, {
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
      payload: GetPropertyGroupPagedListPayload
    ): Promise<WithPagination<PropertyGroupEntity>> {
      return new Promise((resolve, reject) => {
        const loaderStore = useLoaderStore();
        const alertStore = useAlertStore();
        loaderStore.setLoaderState(true);
        propertyGroupApiService
          .getPropertyGroup(payload)
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
      payload: CreatePropertyGroupPayload[]
    ): Promise<ResponseWithStatus<PropertyGroupEntity>[]> {
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
      payload: UpdatePropertyGroupPayload[]
    ): Promise<ResponseWithStatus<PropertyGroupEntity>[]> {
      return new Promise((resolve, reject) => {
        const loaderStore = useLoaderStore();
        const alertStore = useAlertStore();
        loaderStore.setLoaderState(true);
        propertyGroupApiService
          .updateGroupProperties(payload)
          .then((response) => {
            this.fetchGroupPropertyList({
              pageSize: 500,
              sortDirection: SORT_DIRECTION_ENUM.ASCENDING,
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
