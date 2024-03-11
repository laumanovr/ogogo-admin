export interface IPropertyApi {
  key: string;
  name: string;
  nameKy: string;
  nameEn: string;
  icoBase64: string;
  propertyType: number;
  propertyValueType: number;
  propertyGroupId: string;
  propertySubGroupId: string;
  localization: boolean;
  validationRules: object;
}

export interface IGetPropertyList {
  pageSize?: number;
  search?: string;
}

export interface IPropertyWithWholeObject extends IPropertyApi {
  result?: {
    key: string;
    name: string;
    nameKy: string;
    nameEn: string;
    icoBase64: string;
    propertyType: number;
    propertyValueType: number;
    propertyGroupId: string;
    propertySubGroupId: string;
    localization: boolean;
    validationRules: object;
  };
}
