import { PropertyValueEntity } from "@/entities/property-value";

export interface PropertyValueState {
  propertyValueList: PropertyValueEntity[];
  selectedProperty: any; // TODO: replace this type
}
