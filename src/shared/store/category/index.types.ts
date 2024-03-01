import { ICategorySettings } from "@/shared/api/category/index.types";

export interface ICategorySharedState {
  categories: ICategory[];
  categoryIcon: string;
  categoryHasChanged: boolean;
  categoryById: ICategorySettings;
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
