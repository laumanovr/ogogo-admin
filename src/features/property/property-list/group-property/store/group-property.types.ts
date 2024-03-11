import { IGroupPropertyApi } from "../api/group-property-api.types";

export interface IGroupProperty {
  name: string;
  nameEn: string;
  nameKy: string;
  sequenceNumber: string;
  icoBase64: string;
  groupPropertyList: IGroupPropertyApi[];
}

export interface IGetGroupPropertyList {
  pageSize: number;
  search?: string;
}
