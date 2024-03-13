import { defineStore } from "pinia";
import { IGroupProperty, IGetGroupPropertyList } from "./group-property.types";
import {
  IGroupPropertyApi,
  IGroupPropertyWithWholeObject,
} from "../api/group-property-api.types.ts";
import {
  createGroupProperties,
  getGroupProperties,
  updateGroupProperties,
} from "../api/group-property.api.ts";
import { useLoaderStore } from "@/shared/store/loader";
import { useAlertStore } from "@/shared/store/alert";
import { WithPagination } from "@/shared/api/api.types.ts";

const loaderStore = useLoaderStore();
const alertStore = useAlertStore();

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
        loaderStore.setLoaderState(true);
        getGroupProperties(payload)
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
        loaderStore.setLoaderState(true);
        createGroupProperties(payload)
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
        loaderStore.setLoaderState(true);
        updateGroupProperties(payload)
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
