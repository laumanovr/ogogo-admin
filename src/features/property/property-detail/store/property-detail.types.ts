import { IPropertyApi } from "./../../property-list/property/api/property-api.types";
import { IPropertyDetailApi } from "../api/property-detail-api.types";

export interface IPropertyValue {
  propertyId: string;
  value: string;
  valueEn: string;
  valueKy: string;
  icoBase64: string;
  propertyValueList: IPropertyDetailApi[];
  name?: string;
  selectedProperty: IPropertyApi;
}

export interface IGetPropertyList {
  pageSize: number;
  search?: string;
  queryParams: { propertyId: string | string[] };
}
