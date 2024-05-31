import { PropertyValueEntity } from "@/entities/property-value";
import { PropertyEntity } from "@/entities/property/model/PropertyEntity";

export interface PropertyValueState {
  propertyValueList: PropertyValueEntity[];
  selectedProperty: PropertyEntity;
}
