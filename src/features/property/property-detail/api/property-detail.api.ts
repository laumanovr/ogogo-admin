import {
  IPropertyDetailApi,
  IGetPropertyList,
  IPropertyDetailApiWithWholeObject,
} from "./property-detail-api.types";
import { IItemList } from "@/shared/types/index.types";
import { IPropertyApi } from "../../property-list/property/api/property-api.types";
import { API } from "@/shared/lib/plugins/axios";

export const getPropertyValues = (
  data: IGetPropertyList
): Promise<IItemList<IPropertyDetailApi>> => {
  return API({
    method: "POST",
    url: "/Marketplace/GetMarketplacePropertyValuePagedList",
    data: data,
  })
    .then((response) => response.data.result)
    .catch((err) => Promise.reject(err));
};

export const createPropertyValues = (
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

export const updatePropertyValues = (
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

export const getPropertyById = (id: string): Promise<IPropertyApi> => {
  return API({
    method: "GET",
    url: `/Marketplace/GetMarketplaceProperty?id=${id}`,
  })
    .then((response) => response.data.result)
    .catch((err) => Promise.reject(err));
};
