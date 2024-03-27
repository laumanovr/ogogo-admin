import {
  BasePageParams,
  ResponseWithStatus,
  WithPagination,
} from "@/shared/api/api.types";
import { PropertyValueEntity } from "../model/types";

type GetPropertyValuePayloadQueryParams = {
  propertyId: string | string[];
};

export type GetPropertyValuePagedListPayload = BasePageParams & {
  search?: string;
  queryParams?: GetPropertyValuePayloadQueryParams;
};

export type GetPropertyValuePagedListResponse = ResponseWithStatus<
  WithPagination<PropertyValueEntity>
>;

export type CreatePropertyValuePayload = Omit<PropertyValueEntity, "id">;

export type CreatePropertyValueResponse = ResponseWithStatus<
  ResponseWithStatus<PropertyValueEntity>[]
>;

export type UpdatePropertyValuePayload = PropertyValueEntity;

export type UpdatePropertyValueResponse = ResponseWithStatus<
  ResponseWithStatus<PropertyValueEntity>
>;
