export interface IGetGroupPropertyList {
  pageSize: number;
  search?: string;
}

export interface IGroupPropertyApi {
  name: string;
  nameEn: string;
  nameKy: string;
  sequenceNumber: string;
  icoBase64: string;
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
  name: string;
  nameEn: string;
  nameKy: string;
  icoBase64: string;
  sequenceNumber: string;
}

export interface IGroupPropertyWithWholeObject extends IGroupPropertyApi {
  ok: boolean;
  error: Error;
  result: Result;
}
