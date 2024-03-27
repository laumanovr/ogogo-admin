import { CategoryEntity, CategoryTreeEntity } from "../model/types";

export interface CategoryState {
  categoryName: string;
  parentId: string;
  sequenceNumber: number;
  propertySetId: string;
  categories: CategoryTreeEntity[];
  categoryIcon: string;
  categoryHasChanged: boolean;
  categoryById: CategoryEntity;
  namingFields: IPropertyNamingFields;
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
