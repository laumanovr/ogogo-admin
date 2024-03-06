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
    async fetchGroupPropertyList(payload: IGetGroupPropertyList) {
      try {
        loaderStore.setLoaderState(true);
        const response = await getGroupProperties(payload);
        this.groupPropertyList = response?.items;
        loaderStore.setLoaderState(false);
      } catch (err) {
        if (err instanceof Error) {
          alertStore.showError(err.message);
        }
        loaderStore.setLoaderState(false);
      }
    },

    async createGroupProperty(payload: IGroupProperty) {
      try {
        loaderStore.setLoaderState(true);
        const response = await createGroupProperties(payload);
        const items = response.map(
          (item: IGroupPropertyWithWholeObject) => item.result
        );
        const currentItems = this.groupPropertyList.reverse();
        this.groupPropertyList = [...currentItems, ...items];
        loaderStore.setLoaderState(false);
        alertStore.showSuccess("Успешно добавлено!");
      } catch (err) {
        if (err instanceof Error) {
          alertStore.showError(err.message);
        }
        loaderStore.setLoaderState(false);
      }
    },

    async updateGroupProperty(payload: IGroupProperty) {
      try {
        loaderStore.setLoaderState(true);
        await updateGroupProperties(payload);
        await this.fetchGroupPropertyList({ pageSize: 500 });
        loaderStore.setLoaderState(false);
        alertStore.showSuccess("Успешно обновлено!");
      } catch (err) {
        if (err instanceof Error) {
          alertStore.showError(err.message);
        }
        loaderStore.setLoaderState(false);
      }
    },
  },
});
