import { PropertyRenderType } from "@/shared/lib/utils/enums";

export interface ICategory {
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
  propertyId: string;
  required: boolean;
  propertySelector: boolean;
  isAddNameToProductName: boolean;
  renderType: PropertyRenderType;
  allowedValues: AllowedValue[];
}

export interface AllowedValue {
  propertyValueId: string;
}
