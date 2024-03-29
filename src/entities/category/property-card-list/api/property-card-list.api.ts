import { API } from "@/shared/lib/plugins/axios";
import { singleton } from "tsyringe";
import {
  PropertyValueAutocomplete,
  PropertyValueAutocompletePayload,
} from "./property-card-list.api.types";

@singleton()
export class PropertyCardListApi {
  getPropertyValueAutocomplete = (
    payload: PropertyValueAutocompletePayload
  ): Promise<PropertyValueAutocomplete[]> =>
    API.post(
      `Marketplace/GetMarketplacePropertyValueAutocomplete`,
      payload
    ).then((res) => res.data.result);
}
