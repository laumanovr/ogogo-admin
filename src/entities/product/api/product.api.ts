import { API } from "@/shared/lib/plugins/axios";
import { singleton } from "tsyringe";
import { ProductPayload, ProductApiResponse } from "./product-api.types";

@singleton()
export class ProductApi {
  getModerationProducts = (
    payload: ProductPayload
  ): Promise<ProductApiResponse> => {
    return API({
      method: "POST",
      url: "/MarketplaceProduct/GetMarketplaceProductForModerationPagedList",
      data: payload,
    })
      .then((response) => response.data)
      .catch((err) => Promise.reject(err));
  };
}
