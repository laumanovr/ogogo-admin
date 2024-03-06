export interface IPropertyValue {
  propertyId: string;
  value: string;
  valueEn: string;
  valueKy: string;
  icoBase64: string;
  propertyValueList: IPropertyValue[];
  name?: string;
  selectedProperty: IPropertyValue;
}
