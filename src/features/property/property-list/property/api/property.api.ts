import { IGetPropertyList, IPropertyApi } from "./property-api.types";
import { WithPagination } from "@/shared/api/api.types";
import {
  IGetGroupPropertyList,
  IGroupPropertyApi,
} from "../../group-property/api/group-property-api.types";

import { singleton } from "tsyringe";
import { API } from "@/shared/lib/plugins/axios";

@singleton()
export class PropertyApi {
  getSubGroupProperties = (
    data: IGetGroupPropertyList
  ): Promise<IGroupPropertyApi[]> => {
    return API({
      method: "POST",
      url: "/Marketplace/GetMarketplacePropertyGroupAutocomplete",
      data: data,
    })
      .then((response) => response.data.result)
      .catch((err) => Promise.reject(err));
  };

  getProperties = (
    data: IGetPropertyList
  ): Promise<WithPagination<IPropertyApi>> => {
    return API({
      method: "POST",
      url: "/Marketplace/GetMarketplacePropertyPagedList",
      data: data,
    })
      .then((response: any) => response.data.result)
      .catch((err) => Promise.reject(err));
  };

  createProperties = (data: IPropertyApi): Promise<IPropertyApi[]> => {
    return API({
      method: "POST",
      url: "/Marketplace/CreateMarketplacePropertyList",
      data: data,
    })
      .then((response) => response.data.result)
      .catch((err) => Promise.reject(err));
  };

  updateProperties = (data: IPropertyApi): Promise<IPropertyApi[]> => {
    return API({
      method: "PUT",
      url: "/Marketplace/UpdateMarketplacePropertyList",
      data: data,
    })
      .then((response) => response.data.result)
      .catch((err) => Promise.reject(err));
  };
}
