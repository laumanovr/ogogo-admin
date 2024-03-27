import { PropertyEntity } from "@/entities/property";
import { AutocompleteEntity } from "@/shared/api/api.types";

export interface PropertyState {
  propertyList: PropertyEntity[];
  propertyGroupListAutocomplete: AutocompleteEntity[];
}
