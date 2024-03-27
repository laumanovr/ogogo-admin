import { API } from "@/shared/lib/plugins/axios";
import { singleton } from "tsyringe";
import {
  PropertyGroupEntity,
  GetPropertyGroupPagedListPayload,
  CreatePropertyGroupPayload,
  UpdatePropertyGroupPayload,
} from "@/entities/property-group";
import { ResponseWithStatus, WithPagination } from "@/shared/api/api.types";

@singleton()
export class PropertyGroupApi {
  getPropertyGroup = (
    payload: GetPropertyGroupPagedListPayload
  ): Promise<WithPagination<PropertyGroupEntity>> => {
    return API({
      method: "POST",
      url: "/Marketplace/GetMarketplacePropertyGroupPagedList",
      data: payload,
    })
      .then((response) => response.data.result)
      .catch((err) => Promise.reject(err));
  };
  createGroupProperties = (
    payload: CreatePropertyGroupPayload[]
  ): Promise<ResponseWithStatus<PropertyGroupEntity>[]> => {
    return API({
      method: "POST",
      url: "/Marketplace/CreateMarketplacePropertyGroupList",
      data: payload,
    })
      .then((response) => response.data)
      .catch((err) => Promise.reject(err));
  };
  updateGroupProperties = (
    payload: UpdatePropertyGroupPayload[]
  ): Promise<ResponseWithStatus<PropertyGroupEntity>[]> => {
    return API({
      method: "PUT",
      url: "/Marketplace/UpdateMarketplacePropertyGroupList",
      data: payload,
    })
      .then((response) => response.data)
      .catch((err) => Promise.reject(err));
  };
}
