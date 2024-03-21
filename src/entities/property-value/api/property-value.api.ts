import { WithPagination } from "@/shared/api/api.types";
import { API } from "@/shared/lib/plugins/axios";
import { singleton } from "tsyringe";
import {
  CreatePropertyValueEntity,
  PropertyValueEntity,
  PropertyValueEntityBaseResult,
  PropertyValuePageParams,
} from "../";

@singleton()
export class PropertyValueApi {
  getPropertyValues = (
    payload: PropertyValuePageParams
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
    payload: CreatePropertyValueEntity[]
  ): Promise<PropertyValueEntityBaseResult[]> => {
    return API({
      method: "POST",
      url: "/Marketplace/CreateMarketplacePropertyValueList",
      data: payload,
    })
      .then((response) => response.data.result)
      .catch((err) => Promise.reject(err));
  };

  updatePropertyValues = (
    payload: PropertyValueEntity[]
  ): Promise<PropertyValueEntityBaseResult[]> => {
    return API({
      method: "PUT",
      url: "/Marketplace/UpdateMarketplacePropertyValueList",
      data: payload,
    })
      .then((response) => response.data.result)
      .catch((err) => Promise.reject(err));
  };

  // getPropertyById = (id: string): Promise<IPropertyApi> =>
  //   API.get(`Marketplace/GetMarketplaceProperty?id=${id}`)
  //     .then((response) => response.data.result)
  //     .catch((err) => Promise.reject(err));
}
