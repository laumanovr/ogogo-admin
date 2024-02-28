export interface ICategory {
  categoryName: string;
  parentId: string;
  sequenceNumber: number;
  propertySetId: string;
  translations: ITranslations;
}

export interface ITranslations {
  ky: string;
  en: string;
}
