import { defineStore } from "pinia";
import { IAddPropertyState } from "./add-property.store.types";
import { IGetMarketplacePropertyAutocomplete } from "../api/add-poperty.api.types";
import { container } from "tsyringe";
import { IPropertyCardListState } from "./property-card-list.store.types";
import { PropertyCardListApi } from "../api/property-card-list.api";
import { PropertyValueAutocomplete } from "../api/property-card-list.api.types";

const propertyCardListApi = container.resolve(PropertyCardListApi);

export const usePropertyCardListStore = defineStore("property-card-list", {
  state: (): IPropertyCardListState => {
    return {
      propertyValueAutocomplete: null,
    };
  },
  getters: {
    getPropertyValueAutocomplete(): PropertyValueAutocomplete[] {
      return this.propertyValueAutocomplete;
    },
  },
  actions: {
    fetchPropertiesListAutocomplete(propertyId: string) {
      return new Promise((resolve, reject) => {
        propertyCardListApi
          .getPropertyValueAutocomplete({
            pageIndex: 0,
            pageSize: 10000,
            queryParams: {
              propertyId: propertyId,
            },
          })
          .then((data) => {
            console.log(data);
            this.propertyValueAutocomplete = data;
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
});
