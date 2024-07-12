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
  selectedCategory: { id?: string; parentId?: string; sequenceNumber?: number };
  mode: string;
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
