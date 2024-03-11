import { IGroupPropertyApi } from "../../group-property/api/group-property-api.types";
import { IPropertyApi } from "../api/property-api.types";

export interface IProperty {
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
  propertyList: IPropertyApi[];
  groupPropertyList: IGroupPropertyApi[];
}

export interface IGetPropertyList {
  pageSize?: number;
  search?: string;
}
