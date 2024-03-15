import { API } from "@/shared/lib/plugins/axios";
import {
  IGetGroupPropertyList,
  IGroupPropertyApi,
  IGroupPropertyWithWholeObject,
} from "./group-property-api.types";
import { WithPagination } from "@/shared/api/api.types";
import { singleton } from "tsyringe";

@singleton()
export class GroupPropertyApi {
  getGroupProperties = (
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
  createGroupProperties = (
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
  updateGroupProperties = (
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
}
