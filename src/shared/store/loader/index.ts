import {defineStore} from "pinia";
import type {ILoader} from "@/shared/store/loader/index.types";

export const useLoaderStore = defineStore("loader", {
    state: ():ILoader => ({
        isLoading: false
    }),
    actions: {
        setLoaderState(status) {
            this.isLoading = status;
        }
    }
})