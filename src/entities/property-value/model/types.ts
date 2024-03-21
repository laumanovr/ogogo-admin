import { BasePageParams, PostResultWrapper } from "@/shared/api/api.types";

export interface PropertyValueEntity {
  id: string;
  propertyId: string;
  value: string;
  valueEn: string;
  valueKy: string;
  icoBase64: string | ArrayBuffer;
}

interface PropertyValueQueryParams {
  propertyId: string | string[];
}

export interface PropertyValuePageParams extends BasePageParams {
  search?: string;
  queryParams?: PropertyValueQueryParams;
}

export type CreatePropertyValueEntity = Omit<PropertyValueEntity, "id">;

export type PropertyValueEntityBaseResult =
  PostResultWrapper<PropertyValueEntity>;
