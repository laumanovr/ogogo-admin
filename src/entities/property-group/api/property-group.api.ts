import { API } from "@/shared/lib/plugins/axios";
import { singleton } from "tsyringe";
import {
  PropertyGroupPageParams,
  PropertyGroupEntity,
  PropertyGroupEntityBaseResult,
  UpdatePropertyGroupEntity,
  CreatePropertyGroupEntity,
} from "@/entities/property-group";
import { WithPagination } from "@/shared/api/api.types";
import { AxiosResponse } from "axios";

@singleton()
export class PropertyGroupApi {
  getGroupProperties = (
    payload: PropertyGroupPageParams
  ): Promise<WithPagination<PropertyGroupEntity>> => {
    return API({
      method: "POST",
      url: "/Marketplace/GetMarketplacePropertyGroupPagedList",
      data: payload,
    })
      .then((response) => response.data.result)
      .catch((err) => Promise.reject(err));
  };
  createGroupProperties = (
    payload: CreatePropertyGroupEntity[]
  ): Promise<PropertyGroupEntityBaseResult[]> => {
    return API({
      method: "POST",
      url: "/Marketplace/CreateMarketplacePropertyGroupList",
      data: payload,
    })
      .then(
        (response: AxiosResponse<PropertyGroupEntityBaseResult[]>) =>
          response.data
      )
      .catch((err) => Promise.reject(err));
  };
  updateGroupProperties = (
    payload: Array<UpdatePropertyGroupEntity>
  ): Promise<Array<PropertyGroupEntityBaseResult>> => {
    return API({
      method: "PUT",
      url: "/Marketplace/UpdateMarketplacePropertyGroupList",
      data: payload,
    })
      .then(
        (response: AxiosResponse<Array<PropertyGroupEntityBaseResult>>) =>
          response.data
      )
      .catch((err) => Promise.reject(err));
  };
}
