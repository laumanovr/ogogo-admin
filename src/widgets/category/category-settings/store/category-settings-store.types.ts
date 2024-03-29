import { BasePageParams } from "@/shared/api/api.types";
import {
  AllowedValue,
  PropertyValueAutocomplete,
} from "@/shared/api/category/index.types";
import { PropertyRenderType } from "@/shared/lib/utils/enums";

export interface ICategoryState {
  categoryName: string;
  categoryNameKy: string;
  categoryNameEn: string;
  parentId: string;
  sequenceNumber: number;
  icoBase64: string | ArrayBuffer;
  imageId: string;
  properties: Property[];
}

export interface ICategory extends Partial<BasePageParams> {
  id?: string;
  categoryName: string;
  categoryNameKy: string;
  categoryNameEn: string;
  parentId: string;
  sequenceNumber: number;
  icoBase64: string | ArrayBuffer;
  imageId: string;
  properties: Property[];
}

export interface Property {
  id?: string;
  propertyId: string;
  name?: string;
  required: boolean;
  propertySelector: boolean;
  isAddNameToProductName: boolean;
  renderType: PropertyRenderType;
  allowedValues: Array<AllowedValue | PropertyValueAutocomplete>;
}

// export interface AllowedValue {
//   propertyValueId: string;
//   propertyValueText?: string;
//   propertyValueIco?: string;
// }
