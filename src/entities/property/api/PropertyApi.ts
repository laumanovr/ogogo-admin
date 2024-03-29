import {
  CreatePropertyPayload,
  PropertyEntityPagedListBaseResult,
  UpdatePropertyPayload,
  GetPropertyPagedListPayload,
  GetSubGroupPropertiesPayload,
  PropertyEntity,
} from "..";
import {
  AutocompleteEntity,
  ResponseWithStatus,
  WithPagination,
} from "@/shared/api/api.types";
import { singleton } from "tsyringe";
import { API } from "@/shared/lib/plugins/axios";
import { AxiosResponse } from "axios";

@singleton()
export class PropertyApi {
  getSubGroupProperties = (
    payload: GetSubGroupPropertiesPayload
  ): Promise<AutocompleteEntity[]> => {
    return API({
      method: "POST",
      url: "/Marketplace/GetMarketplacePropertyGroupAutocomplete",
      data: payload,
    })
      .then((response) => response.data.result)
      .catch((err) => Promise.reject(err));
  };

  getProperties = (
    payload: GetPropertyPagedListPayload
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
    payload: CreatePropertyPayload[]
  ): Promise<ResponseWithStatus<PropertyEntity>[]> => {
    return API({
      method: "POST",
      url: "/Marketplace/CreateMarketplacePropertyList",
      data: payload,
    })
      .then((response) => response.data.result)
      .catch((err) => Promise.reject(err));
  };

  updateProperties = (
    payload: UpdatePropertyPayload[]
  ): Promise<ResponseWithStatus<PropertyEntity>[]> => {
    return API({
      method: "PUT",
      url: "/Marketplace/UpdateMarketplacePropertyList",
      data: payload,
    })
      .then((response) => response.data)
      .catch((err) => Promise.reject(err));
  };
}
