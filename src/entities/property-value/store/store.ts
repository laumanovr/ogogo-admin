import { defineStore } from "pinia";
import {
  CreatePropertyValuePayload,
  GetPropertyValuePagedListPayload,
  PropertyValueApi,
  PropertyValueEntity,
  UpdatePropertyValuePayload,
} from "@/entities/property-value";
import i18n from "@/shared/lib/plugins/i18n";
import { container } from "tsyringe";
import { ResponseWithStatus, WithPagination } from "@/shared/api/api.types";
import { PropertyValueState } from "./types";
import { PropertyEntity } from "@/entities/property/model/PropertyEntity";

const propertyValueApiService = container.resolve(PropertyValueApi);

const NAME_ID = "property-value-store";

export const usePropertyValueStore = defineStore(NAME_ID, {
  state: (): PropertyValueState => {
    return {
      propertyValueList: [],
      selectedProperty: null,
    };
  },
  getters: {
    getPropertyValueList(): PropertyValueEntity[] {
      return this.propertyValueList;
    },
    getSelectedProperty(): PropertyEntity {
      return this.selectedProperty;
    },
  },
  actions: {
    fetchPropertyValueList(
      payload: GetPropertyValuePagedListPayload
    ): Promise<WithPagination<PropertyValueEntity>> {
      return new Promise((resolve, reject) => {
        propertyValueApiService
          .getPropertyValues(payload)
          .then((response) => {
            this.propertyValueList = response.items;
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    createPropertyValue(
      payload: CreatePropertyValuePayload[]
    ): Promise<string> {
      return new Promise((resolve, reject) => {
        propertyValueApiService
          .createPropertyValues(payload)
          .then((response) => {
            const items = response.map(
              (item: ResponseWithStatus<PropertyValueEntity>) => item.result
            );
            const currentItems = this.propertyValueList.reverse();
            this.propertyValueList = [...currentItems, ...items];
            resolve(i18n.global.t("lang-e4130c8c-ba3a-4077-b87c-79fa6c8a2c78"));
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    updatePropertyValue(
      payload: UpdatePropertyValuePayload[]
    ): Promise<string> {
      return new Promise((resolve, reject) => {
        propertyValueApiService
          .updatePropertyValues(payload)
          .then(() => {
            resolve(i18n.global.t("lang-289aea10-b34b-4ecb-aea3-801be049558f"));
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    fetchPropertyById(id: string) {
      return new Promise((resolve, reject) => {
        propertyValueApiService
          .getPropertyById(id)
          .then((response) => {
            this.selectedProperty = response;
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
});
