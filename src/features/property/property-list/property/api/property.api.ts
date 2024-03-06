import axios from "axios";
import { IGetPropertyList, IPropertyApi } from "./property-api.types";
import { IItemList } from "@/shared/types/index.types";
import {
  IGetGroupPropertyList,
  IGroupPropertyApi,
} from "../../group-property/api/group-property-api.types";

export const getSubGroupProperties = (
  data: IGetGroupPropertyList
): Promise<IItemList<IGroupPropertyApi>> => {
  return axios({
    method: "POST",
    url: "/Marketplace/GetMarketplacePropertyGroupAutocomplete",
    data: data,
  })
    .then((response) => response.data.result)
    .catch((err) => Promise.reject(err));
};

export const getProperties = (
  data: IGetPropertyList
): Promise<IItemList<IPropertyApi>> => {
  return axios({
    method: "POST",
    url: "/Marketplace/GetMarketplacePropertyPagedList",
    data: data,
  })
    .then((response: any) => response.data.result)
    .catch((err) => Promise.reject(err));
};

export const createProperties = (
  data: IPropertyApi
): Promise<IPropertyApi[]> => {
  return axios({
    method: "POST",
    url: "/Marketplace/CreateMarketplacePropertyList",
    data: data,
  })
    .then((response) => response.data.result)
    .catch((err) => Promise.reject(err));
};

export const updateProperties = (
  data: IPropertyApi
): Promise<IPropertyApi[]> => {
  return axios({
    method: "PUT",
    url: "/Marketplace/UpdateMarketplacePropertyList",
    data: data,
  })
    .then((response) => response.data.result)
    .catch((err) => Promise.reject(err));
};
