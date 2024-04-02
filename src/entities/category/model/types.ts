import { PROPERTY_TYPE, PROPERTY_VALUE_TYPE } from "@/entities/property";
import {
  BaseCreateAndUpdateData,
  BasePageParams,
} from "@/shared/api/api.types";
import { PropertyRenderType } from "@/shared/lib/utils/enums";
import { Nullable } from "@/shared/lib/utils/nullable";

export type CategoryEntity = BaseCreateAndUpdateData & {
  id: string;
  categoryName: Nullable<string>;
  categoryNameKy: Nullable<string>;
  categoryNameEn: Nullable<string>;
  icoBase64: Nullable<string | ArrayBuffer>;
  imageId: Nullable<string>;
  parentId: Nullable<string>;
  childMarketplaceCategoryIdList: string[];
  sequenceNumber: number;
  properties: CategoryByIdProperty[];
  parentProperties: CategorySettingPropertySetEntity[];
};

export type CategorySettingPropertySetEntity = {
  id: Nullable<string>;
  propertyId: string;
  property: CategoryPropertyShortEntity[];
};

export type CategoryPropertyShortEntity = {
  id: string;
  key: Nullable<string>;
  name: Nullable<string>;
  nameKy: Nullable<string>;
  nameEn: Nullable<string>;
  icoBase64: Nullable<string | ArrayBuffer>;
  propertyType: PROPERTY_TYPE;
  propertyValueType: PROPERTY_VALUE_TYPE;
};

export type CategoryByIdProperty = {
  id?: string;
  propertyId: string;
  name?: string;
  required: boolean;
  propertySelector: boolean;
  isAddNameToProductName: boolean;
  renderType: PropertyRenderType;
  allowedValues: Array<AllowedValue | PropertyValueAutocomplete>;
};

export type AllowedValue = {
  propertyValueId: string;
  propertyValueText?: string;
  propertyValueIco?: string;
};

export type CategoryTreeEntity = CategoryModified & {
  id: string;
  categoryName: string;
  parentId?: string;
  icon?: string;
  childMarketplaceCategories?: CategoryTreeEntity[]; // TODO: replace with real data
};

export type CategoryModified = {
  categoryName: string;
  childMarketplaceCategoryIdList?: CategoryModified[];
  active?: boolean;
  icon?: string;
  parentId?: string;
  id: string;
  sequenceNumber: number;
};

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
