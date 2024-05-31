import { ResponseWithStatus, WithPagination } from "@/shared/api/api.types";
import { API } from "@/shared/lib/plugins/axios";
import { singleton } from "tsyringe";
import {
  CreatePropertyValuePayload,
  GetPropertyValuePagedListPayload,
  PropertyValueEntity,
  UpdatePropertyValuePayload,
} from "..";

@singleton()
export class PropertyValueApi {
  getPropertyValues = (
    payload: GetPropertyValuePagedListPayload
  ): Promise<WithPagination<PropertyValueEntity>> => {
    return API({
      method: "POST",
      url: "/Marketplace/GetMarketplacePropertyValuePagedList",
      data: payload,
    })
      .then((response) => response.data.result)
      .catch((err) => Promise.reject(err));
  };

  createPropertyValues = (
    payload: CreatePropertyValuePayload[]
  ): Promise<ResponseWithStatus<PropertyValueEntity>[]> => {
    return API({
      method: "POST",
      url: "/Marketplace/CreateMarketplacePropertyValueList",
      data: payload,
    })
      .then((response) => response.data.result)
      .catch((err) => Promise.reject(err));
  };

  updatePropertyValues = (
    payload: UpdatePropertyValuePayload[]
  ): Promise<ResponseWithStatus<PropertyValueEntity>[]> => {
    return API({
      method: "PUT",
      url: "/Marketplace/UpdateMarketplacePropertyValueList",
      data: payload,
    })
      .then((response) => response.data.result)
      .catch((err) => Promise.reject(err));
  };

  getPropertyById = (id: string) => {
    return API({
      method: "GET",
      url: `Marketplace/GetMarketplaceProperty?id=${id}`,
    })
      .then((response) => response.data.result)
      .catch((err) => Promise.reject(err));
  };
}
