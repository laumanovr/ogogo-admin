import { defineStore } from "pinia";
import { container } from "tsyringe";
import i18n from "@/shared/lib/plugins/i18n";
import {
  SORT_DIRECTION,
  WithPagination,
} from "@/shared/api/api.types.ts";
import {
  CreatePropertyGroupPayload,
  GetPropertyGroupPagedListPayload,
  PropertyGroupApi,
  PropertyGroupEntity,
  UpdatePropertyGroupPayload,
} from "@/entities/property-group";
import { PropertyGroupState } from "./types";

const propertyGroupApiService = container.resolve(PropertyGroupApi);

const NAME_ID = "property-group";

export const usePropertyGroupStore = defineStore(NAME_ID, {
  state: (): PropertyGroupState => {
    return {
      propertyGroupList: [],
    };
  },
  getters: {
    getPropertyGroupList(): PropertyGroupEntity[] {
      return this.propertyGroupList;
    },
  },
  actions: {
    fetchGroupPropertyList(
      payload: GetPropertyGroupPagedListPayload
    ): Promise<WithPagination<PropertyGroupEntity>> {
      return new Promise((resolve, reject) => {
        propertyGroupApiService
          .getPropertyGroup(payload)
          .then((response) => {
            this.propertyGroupList = response?.items;
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    createGroupProperty(
      payload: CreatePropertyGroupPayload[]
    ): Promise<string> {
      return new Promise((resolve, reject) => {
        propertyGroupApiService
          .createGroupProperties(payload)
          .then((response) => {
            response.result.forEach((item: any) => {
              if (item.ok) {
                this.propertyGroupList.unshift(item.result);
              }
            });
            resolve(i18n.global.t("lang-e4130c8c-ba3a-4077-b87c-79fa6c8a2c78"));
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    updateGroupProperty(
      payload: UpdatePropertyGroupPayload[]
    ): Promise<string> {
      return new Promise((resolve, reject) => {
        propertyGroupApiService
          .updateGroupProperties(payload)
          .then(() => {
            this.fetchGroupPropertyList({
              pageSize: 500,
              sortDirection: SORT_DIRECTION.ASCENDING,
              queryParams: null,
              pageIndex: 0,
            });
            resolve(i18n.global.t("lang-289aea10-b34b-4ecb-aea3-801be049558f"));
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
});
