import {
  IPropertyDetailApi,
  IGetPropertyList,
  IPropertyDetailApiWithWholeObject,
} from "./property-detail-api.types";
import { WithPagination } from "@/shared/api/api.types";
import { IPropertyApi } from "../../property-list/property/api/property-api.types";
import { API } from "@/shared/lib/plugins/axios";
import { singleton } from "tsyringe";

@singleton()
export class PropertyDetailApi {
  getPropertyValues = (
    data: IGetPropertyList
  ): Promise<WithPagination<IPropertyDetailApi>> => {
    return API({
      method: "POST",
      url: "/Marketplace/GetMarketplacePropertyValuePagedList",
      data: data,
    })
      .then((response) => response.data.result)
      .catch((err) => Promise.reject(err));
  };

  createPropertyValues = (
    data: IPropertyDetailApi
  ): Promise<IPropertyDetailApiWithWholeObject[]> => {
    return API({
      method: "POST",
      url: "/Marketplace/CreateMarketplacePropertyValueList",
      data: data,
    })
      .then((response) => response.data.result)
      .catch((err) => Promise.reject(err));
  };

  updatePropertyValues = (
    data: IPropertyDetailApi
  ): Promise<IPropertyDetailApi[]> => {
    return API({
      method: "PUT",
      url: "/Marketplace/UpdateMarketplacePropertyValueList",
      data: data,
    })
      .then((response) => response.data.result)
      .catch((err) => Promise.reject(err));
  };

  getPropertyById = (id: string): Promise<IPropertyApi> =>
    API.get(`Marketplace/GetMarketplaceProperty?id=${id}`)
      .then((response) => response.data.result)
      .catch((err) => Promise.reject(err));
}
