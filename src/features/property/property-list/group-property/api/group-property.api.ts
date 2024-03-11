import { API } from "@/shared/lib/plugins/axios";
import {
  IGetGroupPropertyList,
  IGroupPropertyApi,
  IGroupPropertyWithWholeObject,
} from "./group-property-api.types";
import { IItemList } from "@/shared/types/index.types";

export const getGroupProperties = (
  data: IGetGroupPropertyList
): Promise<IItemList<IGroupPropertyApi>> => {
  return API({
    method: "POST",
    url: "/Marketplace/GetMarketplacePropertyGroupPagedList",
    data: data,
  })
    .then((response) => response.data.result)
    .catch((err) => Promise.reject(err));
};

export const createGroupProperties = (
  data: IGroupPropertyApi
): Promise<IGroupPropertyWithWholeObject[]> => {
  return API({
    method: "POST",
    url: "/Marketplace/CreateMarketplacePropertyGroupList",
    data: data,
  })
    .then((response) => response.data.result)
    .catch((err) => Promise.reject(err));
};

export const updateGroupProperties = (
  data: IGroupPropertyApi
): Promise<IGroupPropertyApi[]> => {
  return API({
    method: "PUT",
    url: "/Marketplace/UpdateMarketplacePropertyGroupList",
    data: data,
  })
    .then((response) => response.data.result)
    .catch((err) => Promise.reject(err));
};

export default {
  createGroupProperties,
  getGroupProperties,
  updateGroupProperties,
};
