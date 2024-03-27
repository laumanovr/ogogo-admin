import { PROPERTY_TYPE, PROPERTY_VALUE_TYPE } from "@/entities/property";
import { BaseCreateAndUpdateData } from "@/shared/api/api.types";
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
  properties: CategorySettingPropertySetEntity[];
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

export type CategoryTreeEntity = {
  id: string;
  categoryName: string;
  parentId: string;
  icon?: string;
  childMarketplaceCategories: any[]; // TODO: replace with real data
};
