import { BasePageParams } from "@/shared/api/api.types";

export interface PropertyValueAutocompletePayload extends BasePageParams {
  search?: string;
  sortDirection?: number;
  queryParams: {
    propertyId: string;
  };
}

export interface PropertyValueAutocomplete {
  id: string;
  value: string;
  description: string;
  icoBase64: string;
}
