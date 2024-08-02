import { defineStore } from "pinia";
import {
  CreatePropertyPayload,
  GetPropertyPagedListPayload,
  GetSubGroupPropertiesPayload,
  PropertyApi,
  PropertyEntity,
  UpdatePropertyPayload,
} from "@/entities/property";
import i18n from "@/shared/lib/plugins/i18n";
import { container } from "tsyringe";
import { AutocompleteEntity, WithPagination } from "@/shared/api/api.types";
import { PropertyState } from "./types";

const propertyApiService = container.resolve(PropertyApi);

const NAME_ID = "property";

export const usePropertyStore = defineStore(NAME_ID, {
  state: (): PropertyState => {
    return {
      propertyList: [],
      propertyGroupListAutocomplete: [],
    };
  },
  getters: {
    getPropertyList(): PropertyEntity[] {
      return this.propertyList;
    },
    getPropertyGroupListAutocomplete(): AutocompleteEntity[] {
      return this.propertyGroupListAutocomplete;
    },
  },
  actions: {
    fetchPropertyGroupListAutocomplete(
      payload: GetSubGroupPropertiesPayload
    ): Promise<AutocompleteEntity[]> {
      return new Promise((resolve, _) => {
        propertyApiService.getSubGroupProperties(payload).then((response) => {
          this.propertyGroupListAutocomplete = response;
          resolve(response);
        });
      });
    },
    fetchPropertyList(
      payload: GetPropertyPagedListPayload
    ): Promise<WithPagination<PropertyEntity>> {
      return new Promise((resolve, _) => {
        propertyApiService.getProperties(payload).then((response) => {
          this.propertyList = response.items;
          resolve(response);
        });
      });
    },
    createPropertyList(payload: CreatePropertyPayload[]): Promise<string> {
      return new Promise((resolve, _) => {
        propertyApiService.createProperties(payload).then((response) => {
          response.forEach((item) => {
            if (item.ok) {
              this.propertyList.unshift(item.result);
            }
          });
          resolve(i18n.global.t("lang-e4130c8c-ba3a-4077-b87c-79fa6c8a2c78"));
        });
      });
    },
    updatePropertyList(payload: UpdatePropertyPayload[]): Promise<string> {
      return new Promise((resolve, _) => {
        propertyApiService.updateProperties(payload).then(() => {
          resolve(i18n.global.t("lang-289aea10-b34b-4ecb-aea3-801be049558f"));
        });
      });
    },
  },
});
