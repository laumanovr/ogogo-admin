import { BasePageParams, WithPagination } from "@/shared/api/api.types";

// export abstract class BaseProperty {
//   name: string;
//   nameEn: string;
//   nameKy: string;
//   icoBase64: string | ArrayBuffer;
// }

export interface PropertyPageParams extends BasePageParams {
  search?: string;
  sortDirection: SortDirectionEnum;
  queryParams?: any; // TODO: change when backend done
}

export const enum SortDirectionEnum {
  zero = "0",
  one = "1",
}

export const enum PropertyType {
  NONE = 0,
  Reference = 14000,
  Value = 14001,
}

export const enum PropertyValueType {
  NONE = 0,
  StringValue = 14100,
  IntValue,
  BoolValue,
  DoubleValue,
}

export interface PropertyEntity {
  id: string;
  key: string;
  name: string;
  nameEn: string;
  nameKy: string;
  icoBase64: string | ArrayBuffer;
  propertyType: PropertyType;
  propertyValueType: PropertyValueType;
  countOfPropertyValues: number;
  propertyGroupId: string;
  propertySubGroupId: string;
  localization: boolean;
  validationRules: object; // TODO: replace with validation rules
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
}

export type CreatePropertyEntity = Omit<PropertyEntity, "id">;

export type PropertyEntityBaseResult = PropertyEntity;

export type PropertyEntityPagedListBaseResult = WithPagination<PropertyEntity>;

export interface UpdatePropertyEntity {
  id: string;
  key: string;
  name: string;
  nameEn: string;
  nameKy: string;
  icoBase64: string | ArrayBuffer;
  propertyType: PropertyType;
  propertyValueType: PropertyValueType;
  countOfPropertyValues: number;
  propertyGroupId: string;
  propertySubGroupId: string;
  localization: boolean;
}
