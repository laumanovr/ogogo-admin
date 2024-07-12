import { API } from "@/shared/lib/plugins/axios";
import { singleton } from "tsyringe";
import {
  IGetMarketplacePropertyAutocomplete,
  IGetMarketplacePropertyAutocompletePayload,
} from "./add-poperty.api.types";

@singleton()
export class AddPropertyApi {
  getProperty = (
    payload: Partial<IGetMarketplacePropertyAutocompletePayload>
  ): Promise<IGetMarketplacePropertyAutocomplete[]> => {
    return API({
      method: "POST",
      url: "/Marketplace/GetMarketplacePropertyAutocomplete",
      data: payload,
    })
      .then((response) => response.data.result)
      .catch((err) => Promise.reject(err));
  };
}
