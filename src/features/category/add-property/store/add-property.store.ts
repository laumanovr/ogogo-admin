import { defineStore } from "pinia";
import { IAddPropertyState } from "./add-property.store.types";
import { IGetMarketplacePropertyAutocomplete } from "../api/add-poperty.api.types";
import { container } from "tsyringe";
import { AddPropertyApi } from "../api/add-property.api";

const addPropertyApi = container.resolve(AddPropertyApi);

export const useAddPropertyStore = defineStore("add-property", {
  state: (): IAddPropertyState => {
    return {
      propertiesListAutocomplete: null,
    };
  },
  getters: {
    getPropertiesListAutocomplete(): IGetMarketplacePropertyAutocomplete[] {
      return this.propertiesListAutocomplete;
    },
  },
  actions: {
    fetchPropertiesListAutocomplete() {
      return new Promise((resolve, reject) => {
        addPropertyApi
          .getProperty({
            pageIndex: 0,
            pageSize: 10000,
          })
          .then((data) => {
            this.propertiesListAutocomplete = data;
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
});
