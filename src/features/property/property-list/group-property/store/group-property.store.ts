import { defineStore } from "pinia";
import { IGroupProperty } from "./group-property.types";
import { createGroupProperties, getGroupProperties, updateGroupProperties } from "../api/index.ts";

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
                const response = await getGroupProperties(payload);
                this.groupPropertyList = response?.items;
            } catch (err) {
                console.log(err);
            }
        },

        async createGroupProperty(payload: IGroupProperty) {
            try {
                const response = await createGroupProperties(payload);
                const items = response.map((item) => item.result);
                const currentItems = this.groupPropertyList.reverse()
                this.groupPropertyList = [...currentItems, ...items];
            } catch (err) {
                console.log(err);
            }
        },

        async updateGroupProperty(payload: IGroupProperty) {
            try {
                await updateGroupProperties(payload);
                await this.fetchGroupPropertyList({pageSize: 100})
            } catch (err) {
                console.log(err);
            }
        }
    }
});