export interface ICategorySettings {
  id: string;
  categoryName: string;
  translations: Translations;
  parentId: string;
  childMarketplaceCategoryIdList: string[];
  sequenceNumber: number;
  propertySetId: string;
  createdAt: Date;
  createdBy: number;
  updatedAt: Date;
  updatedBy: number;
}

export interface Translations {
  additionalProp1: string;
  additionalProp2: string;
  additionalProp3: string;
}
