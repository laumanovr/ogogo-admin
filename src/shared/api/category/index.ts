import { API } from "@/shared/lib/plugins/axios";
import {
  ICategorySettings,
  PropertyValueAutocomplete,
  PropertyValueAutocompletePayload,
} from "./index.types";
import { singleton } from "tsyringe";

@singleton()
export class CategoryApi {
  getCategoryById = (id: string): Promise<ICategorySettings> =>
    API.get(`Marketplace/GetMarketplaceCategory`, {
      params: { id },
    }).then((res) => res.data.result);
  getPropertyValueAutocomplete = (
    payload: PropertyValueAutocompletePayload
  ): Promise<PropertyValueAutocomplete[]> =>
    API.post(
      `Marketplace/GetMarketplacePropertyValueAutocomplete`,
      payload
    ).then((res) => res.data.result);
}
