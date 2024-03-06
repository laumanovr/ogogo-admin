import axios from "axios";
import {
  IPropertyDetailApi,
  IGetPropertyList,
  IPropertyDetailApiWithWholeObject,
} from "./property-detail-api.types";
import { IItemList } from "@/shared/types/index.types";

export const getPropertyValues = (
  data: IGetPropertyList
): Promise<IItemList<IPropertyDetailApi>> => {
  return axios({
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
  return axios({
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
  return axios({
    method: "PUT",
    url: "/Marketplace/UpdateMarketplacePropertyValueList",
    data: data,
  })
    .then((response) => response.data.result)
    .catch((err) => Promise.reject(err));
};

export const getPropertyById = (id: string): Promise<IPropertyDetailApi[]> => {
  return axios({
    method: "GET",
    url: `/Marketplace/GetMarketplaceProperty?id=${id}`,
  })
    .then((response) => response.data.result)
    .catch((err) => Promise.reject(err));
};
