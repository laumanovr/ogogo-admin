export const enum PROPERTY_TYPE {
  NONE = 0,
  REFERENCE = 14000,
  VALUE = 14001,
}

export const enum PROPERTY_VALUE_TYPE {
  NONE = 0,
  StringValue = 14100,
  IntValue,
  BoolValue,
  DoubleValue,
}

export interface PropertyEntity {
  id: string;
  key: string;
  name: string;
  nameEn: string;
  nameKy: string;
  icoBase64: string | ArrayBuffer;
  propertyType: PROPERTY_TYPE;
  propertyValueType: PROPERTY_VALUE_TYPE;
  countOfPropertyValues: number;
  propertyGroupId: string;
  propertySubGroupId: string;
  localization: boolean;
  validationRules: object;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
}
