export interface IPropertyDetailApi {
  propertyId: string;
  value: string;
  valueEn: string;
  valueKy: string;
  icoBase64: string;
  recent?: boolean;
}

export interface Error {
  errorMessage: string;
  errorCode: string;
  additionalInfo: string;
  applicationStatus: string;
  number: string;
}

export interface Result {
  id: string;
  propertyId: string;
  value: string;
  valueEn: string;
  valueKy: string;
  icoBase64: string;
}

export interface IPropertyDetailApiWithWholeObject extends IPropertyDetailApi {
  ok: boolean;
  error: Error;
  result: Result;
}

export interface IGetPropertyList {
  pageSize: number;
  search?: string;
  queryParams: { propertyId: string | string[] };
}
