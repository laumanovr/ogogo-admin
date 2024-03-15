import { defineStore } from "pinia";
import { container } from "tsyringe";
import { IGroupProperty, IGetGroupPropertyList } from "./group-property.types";
import {
  IGroupPropertyApi,
  IGroupPropertyWithWholeObject,
} from "../api/group-property-api.types.ts";
import { useLoaderStore } from "@/shared/store/loader";
import { useAlertStore } from "@/shared/store/alert";
import { WithPagination } from "@/shared/api/api.types.ts";
import { GroupPropertyApi } from "../api/group-property.api.ts";

const groupPropertyApiService = container.resolve(GroupPropertyApi);

export const useGroupPropertyStore = defineStore("group-property-store", {
  state: (): Partial<IGroupProperty> => ({
    groupPropertyList: [],
  }),
  getters: {
    groupProperties(): IGroupPropertyApi[] {
      return this.groupPropertyList;
    },
  },
  actions: {
    fetchGroupPropertyList(
      payload: IGetGroupPropertyList
    ): Promise<WithPagination<IGroupPropertyApi>> {
      return new Promise((resolve, reject) => {
        const loaderStore = useLoaderStore();
        const alertStore = useAlertStore();
        loaderStore.setLoaderState(true);
        groupPropertyApiService
          .getGroupProperties(payload)
          .then((response) => {
            this.groupPropertyList = response?.items;
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
      payload: IGroupProperty
    ): Promise<IGroupPropertyWithWholeObject[]> {
      return new Promise((resolve, reject) => {
        const loaderStore = useLoaderStore();
        const alertStore = useAlertStore();
        loaderStore.setLoaderState(true);
        groupPropertyApiService
          .createGroupProperties(payload)
          .then((response) => {
            const items = response.map(
              (item: IGroupPropertyWithWholeObject) => item.result
            );
            const currentItems = this.groupPropertyList.reverse();
            this.groupPropertyList = [...currentItems, ...items];
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
    updateGroupProperty(payload: IGroupProperty): Promise<IGroupPropertyApi[]> {
      return new Promise((resolve, reject) => {
        const loaderStore = useLoaderStore();
        const alertStore = useAlertStore();
        loaderStore.setLoaderState(true);
        groupPropertyApiService
          .updateGroupProperties(payload)
          .then((response) => {
            this.fetchGroupPropertyList({ pageSize: 500 });
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
