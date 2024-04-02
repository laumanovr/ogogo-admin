import {
  CategoryByIdProperty,
  CategoryEntity,
  CategoryModified,
  CategoryTreeEntity,
  PropertyValueAutocomplete,
} from "../model/types";

export interface CategoryState {
  categoryName: string;
  categoryNameKy: string;
  categoryNameEn: string;
  parentId: string;
  sequenceNumber: number;
  icoBase64: string | ArrayBuffer;
  properties: CategoryByIdProperty[];
  imageId: string;
  propertySetId: string;
  categories: CategoryTreeEntity[] | CategoryModified[];
  categoryIcon: string;
  categoryHasChanged: boolean;
  categoryById: CategoryEntity;
  namingFields: IPropertyNamingFields;
  categoryId: string;
  file: string | File;
  propertyValueAutocomplete: PropertyValueAutocomplete[];
}

export interface ICategory {
  categoryName: string;
  childMarketplaceCategoryIdList: ICategory[];
  active?: boolean;
  icon?: string;
  parentId?: string;
  id: string;
}
export interface IPropertyNamingFields {
  ru: string;
  en: string;
  ky: string;
}

// export type Property = CategorySettingPropertySetEntity & {
//   id?: string;
//   propertyId: string;
//   name?: string;
//   required: boolean;
//   propertySelector: boolean;
//   isAddNameToProductName: boolean;
//   renderType: PropertyRenderType;
//   allowedValues: Array<AllowedValue | PropertyValueAutocomplete>;
// };
