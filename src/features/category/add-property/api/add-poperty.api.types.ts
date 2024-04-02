import { IPageQuery } from "@/shared/types/index.types";

export interface IGetMarketplacePropertyAutocompletePayload extends IPageQuery {
  search?: string;
  sortDirection?: number;
  queryParams?: {};
}

export interface IGetMarketplacePropertyAutocomplete {
  id: string;
  value: string;
  description: string;
}
