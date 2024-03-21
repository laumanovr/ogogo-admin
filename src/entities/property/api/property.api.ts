import {
  CreatePropertyEntity,
  PropertyEntity,
  PropertyEntityBaseResult,
  PropertyEntityPagedListBaseResult,
  PropertyPageParams,
  UpdatePropertyEntity,
} from "../";
import {
  AutocompleteEntity,
  PostResultWrapper,
  WithPagination,
} from "@/shared/api/api.types";
import { singleton } from "tsyringe";
import { API } from "@/shared/lib/plugins/axios";
import { AxiosResponse } from "axios";

@singleton()
export class PropertyApi {
  getSubGroupProperties = (
    payload: PropertyPageParams
  ): Promise<AutocompleteEntity[]> => {
    return API({
      method: "POST",
      url: "/Marketplace/GetMarketplacePropertyGroupAutocomplete",
      data: payload,
    })
      .then(
        (response: AxiosResponse<PostResultWrapper<AutocompleteEntity[]>>) =>
          response.data.result
      )
      .catch((err) => Promise.reject(err));
  };

  getProperties = (
    payload: PropertyPageParams
  ): Promise<WithPagination<PropertyEntity>> => {
    return API({
      method: "POST",
      url: "/Marketplace/GetMarketplacePropertyPagedList",
      data: payload,
    })
      .then(
        (response: AxiosResponse<PropertyEntityPagedListBaseResult>) =>
          response.data.result
      )
      .catch((err) => Promise.reject(err));
  };

  createProperties = (
    payload: CreatePropertyEntity[]
  ): Promise<PropertyEntityBaseResult[]> => {
    return API({
      method: "POST",
      url: "/Marketplace/CreateMarketplacePropertyList",
      data: payload,
    })
      .then(
        (
          response: AxiosResponse<PostResultWrapper<PropertyEntityBaseResult[]>>
        ) => response.data.result
      )
      .catch((err) => Promise.reject(err));
  };

  updateProperties = (
    payload: UpdatePropertyEntity[]
  ): Promise<PropertyEntityBaseResult[]> => {
    return API({
      method: "PUT",
      url: "/Marketplace/UpdateMarketplacePropertyList",
      data: payload,
    })
      .then(
        (response: AxiosResponse<PropertyEntityBaseResult[]>) => response.data
      )
      .catch((err) => Promise.reject(err));
  };
}
