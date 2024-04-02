import { PropertyGroupEntity } from "../model/types";
import {
  BasePageParams,
  ResponseWithStatus,
  SORT_DIRECTION,
} from "@/shared/api/api.types";

export type GetPropertyGroupPagedListPayload = BasePageParams & {
  search?: string;
  sortDirection: SORT_DIRECTION;
  queryParams?: any; // TODO: change when backend done
};

export type GetPropertyGroupPagedListResponse = ResponseWithStatus<
  PropertyGroupEntity[]
>;

export type CreatePropertyGroupPayload = {
  name: string;
  nameEn: string;
  nameKy: string;
  icoBase64: string | ArrayBuffer;
};

export type CreatePropertyGroupResponse = ResponseWithStatus<
  ResponseWithStatus<PropertyGroupEntity[]>
>;

export type UpdatePropertyGroupPayload = {
  id: string;
  name: string;
  nameEn: string;
  nameKy: string;
  icoBase64: string | ArrayBuffer;
}[];

export type UpdatePropertyGroupResponse = ResponseWithStatus<
  ResponseWithStatus<PropertyGroupEntity>
>;
