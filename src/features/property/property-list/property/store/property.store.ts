import { defineStore } from "pinia";
import {
    getSubGroupProperties,
    createProperties,
    getProperties,
    updateProperties
} from "@/features/property/property-list/property/api";
import { IProperty } from "@/features/property/property-list/property/store/property.types";
import { useLoaderStore } from "@/shared/store/loader";
import { useAlertStore } from "@/shared/store/alert";

const loaderStore = useLoaderStore();
const alertStore = useAlertStore();

export const usePropertyStore = defineStore("propertyStore", {
    state: (): IProperty => <IProperty>({
        propertyList: [] as IProperty[],
        groupPropertyList: [] as any[]
    }),
    getters: {
        properties() {
            return this.propertyList;
        },
        groupProperties() {
            return this.groupPropertyList;
        }
    },
    actions: {
        async fetchGroupProperties(data = {}) {
            try {
                loaderStore.setLoaderState(true);
                this.groupPropertyList = await getSubGroupProperties(data);
                loaderStore.setLoaderState(false);
            } catch (err) {
                loaderStore.setLoaderState(false);
                alertStore.showError(err.message);
            }
        },
        async fetchPropertyList(payload: any) {
            try {
                loaderStore.setLoaderState(true);
                const response = await getProperties(payload);
                this.propertyList = response.items;
                loaderStore.setLoaderState(false);
            } catch (err) {
                loaderStore.setLoaderState(false);
                alertStore.showError(err.message);
            }
        },
        async createPropertyList(payload: any) {
            try {
                loaderStore.setLoaderState(true);
                const response = await createProperties(payload);
                const newItems = response.map((item) => item.result);
                this.propertyList = [...this.propertyList, ...newItems];
                loaderStore.setLoaderState(false);
            } catch (err) {
                loaderStore.setLoaderState(false);
                alertStore.showError(err.message);
            }
        },
        async updatePropertyList(payload: any) {
            try {
                loaderStore.setLoaderState(true);
                await updateProperties(payload);
                loaderStore.setLoaderState(false);
            } catch (err) {
                loaderStore.setLoaderState(false);
                alertStore.showError(err.message);
            }
        }
    }
});