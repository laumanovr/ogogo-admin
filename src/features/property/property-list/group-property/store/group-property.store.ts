import { defineStore } from "pinia";
import { IGroupProperty } from "./group-property.types";
import { createGroupProperties, getGroupProperties, updateGroupProperties } from "../api/index.ts";
import { useLoaderStore } from "@/shared/store/loader";
import { useAlertStore } from "@/shared/store/alert";

const loaderStore = useLoaderStore();
const alertStore = useAlertStore();

export const useGroupPropertyStore = defineStore("group-property-store", {
    state: (): IGroupProperty => <IGroupProperty>({
        groupPropertyList: [] as IGroupProperty[],
    }),
    getters: {
        groupProperties() {
            return this.groupPropertyList;
        }
    },
    actions: {
        async fetchGroupPropertyList(payload: any) {
            try {
                loaderStore.setLoaderState(true);
                const response = await getGroupProperties(payload);
                this.groupPropertyList = response?.items;
                loaderStore.setLoaderState(false);
            } catch (err) {
                alertStore.showError(err.message);
                loaderStore.setLoaderState(false);
            }
        },

        async createGroupProperty(payload: IGroupProperty) {
            try {
                loaderStore.setLoaderState(true);
                const response = await createGroupProperties(payload);
                const items = response.map((item) => item.result);
                const currentItems = this.groupPropertyList.reverse();
                this.groupPropertyList = [...currentItems, ...items];
                loaderStore.setLoaderState(false);
                alertStore.showSuccess("Успешно добавлено!");
            } catch (err) {
                alertStore.showError(err.message);
                loaderStore.setLoaderState(false);
            }
        },

        async updateGroupProperty(payload: IGroupProperty) {
            try {
                loaderStore.setLoaderState(true);
                await updateGroupProperties(payload);
                await this.fetchGroupPropertyList({pageSize: 100});
                loaderStore.setLoaderState(false);
                alertStore.showSuccess("Успешно обновлено!");
            } catch (err) {
                alertStore.showError(err.message);
                loaderStore.setLoaderState(false);
            }
        }
    }
});