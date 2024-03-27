import {
  AutocompleteEntity,
  BasePageParams,
  ResponseWithStatus,
  SORT_DIRECTION_ENUM,
  WithPagination,
} from "@/shared/api/api.types";
import {
  PROPERTY_TYPE,
  PROPERTY_VALUE_TYPE,
  PropertyEntity,
} from "../model/PropertyEntity";

export type GetSubGroupPropertiesPayload = BasePageParams & {
  search?: string;
  sortDirection: SORT_DIRECTION_ENUM;
  queryParams?: any; // TODO: change when backend done
};

export type GetSubGroupPropertiesResponse = ResponseWithStatus<
  AutocompleteEntity[]
>;

export interface GetPropertyPagedListPayload extends BasePageParams {
  search?: string;
  sortDirection: SORT_DIRECTION_ENUM;
  queryParams?: any; // TODO: change when backend done
}

export type GetPropertyPagedListPayloadResponse = ResponseWithStatus<
  WithPagination<PropertyEntity>
>;

export type CreatePropertyPayload = Omit<PropertyEntity, "id">;

export type CreatePropertyResponse = ResponseWithStatus<
  ResponseWithStatus<WithPagination<PropertyEntity>>[]
>;

export type PropertyEntityPagedListBaseResult = ResponseWithStatus<
  WithPagination<PropertyEntity>
>;

export interface UpdatePropertyPayload {
  id: string;
  key: string;
  name: string;
  nameEn: string;
  nameKy: string;
  icoBase64: string | ArrayBuffer;
  propertyType: PROPERTY_TYPE;
  propertyValueType: PROPERTY_VALUE_TYPE;
  countOfPropertyValues: number;
  propertyGroupId: string;
  propertySubGroupId: string;
  localization: boolean;
}

export type UpdatePropertyResponse = ResponseWithStatus<PropertyEntity>[];
