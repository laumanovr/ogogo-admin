import { API } from "@/shared/lib/plugins/axios";
import {
  IGetGroupPropertyList,
  IGroupPropertyApi,
  IGroupPropertyWithWholeObject,
} from "./group-property-api.types";
import { WithPagination } from "@/shared/api/api.types";

export const getGroupProperties = (
  data: IGetGroupPropertyList
): Promise<WithPagination<IGroupPropertyApi>> => {
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
