import {
  BasePageParams,
  PostResultWrapper,
  SortDirectionEnum,
} from "@/shared/api/api.types";

export interface PropertyGroupPageParams extends BasePageParams {
  search?: string;
  sortDirection: SortDirectionEnum;
  queryParams?: any; // TODO: change when backend done
}

export interface PropertyGroupEntity {
  id: string;
  name: string;
  nameEn: string;
  nameKy: string;
  icoBase64: string | ArrayBuffer;
  sequenceNumber: string;
  createdAt: string;
  createdBy: number;
  updatedAt: Date;
  updatedBy: number;
}

export type PropertyGroupEntityBaseResult =
  PostResultWrapper<PropertyGroupEntity>;

export interface UpdatePropertyGroupEntity {
  id: string;
  name: string;
  nameEn: string;
  nameKy: string;
  icoBase64: string | ArrayBuffer;
}

export interface CreatePropertyGroupEntity {
  name: string;
  nameEn: string;
  nameKy: string;
  icoBase64: string | ArrayBuffer;
}
