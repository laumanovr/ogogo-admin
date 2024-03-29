import { BasePageParams } from "@/shared/api/api.types";

export interface ICategorySettings {
  id: string;
  categoryName: string;
  categoryNameKy: string;
  categoryNameEn: string;
  parentId: string;
  childMarketplaceCategoryIdList: string[];
  sequenceNumber: number;
  propertySetId: string;
  icoBase64: string | ArrayBuffer;
  imageId: string;
  createdAt: Date;
  createdBy: number;
  updatedAt: Date;
  updatedBy: number;
  properties?: ParentPropertyElement[];
}
export interface ParentPropertyElement {
  id: string;
  propertyId: string;
  property: ParentPropertyProperty;
  required: boolean;
  propertySelector: boolean;
  isAddNameToProductName: boolean;
  renderType: number;
  allowedValues: AllowedValue[];
}

export interface AllowedValue {
  propertyValueId: string;
  propertyValueText?: string;
  propertyValueIco?: string;
}

export interface ParentPropertyProperty {
  id: string;
  key: string;
  name: string;
  nameKy: string;
  nameEn: string;
  icoBase64: string;
  propertyType: number;
  propertyValueType: number;
  countOfPropertyValues: number;
  localization: boolean;
}

export interface PropertyValueAutocompletePayload extends BasePageParams {
  search?: string;
  sortDirection?: number;
  queryParams: {
    propertyId: string;
  };
}

export interface PropertyValueAutocomplete {
  id: string;
  value: string;
  description: string;
  icoBase64: string;
}
