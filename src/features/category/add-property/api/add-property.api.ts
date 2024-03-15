import { ICategorySettings } from "@/shared/api/category/index.types";
import { ICategoryPayload } from "@/widgets/category/category-settings/api/category-settings-api.types"; // TODO: from widgets in features?
import { API } from "@/shared/lib/plugins/axios";
import { singleton } from "tsyringe";

@singleton()
export class AddPropertyApi {
  getProperty = (payload: ICategoryPayload): Promise<ICategorySettings> => {
    return API({
      method: "POST",
      url: "/Marketplace/GetMarketplacePropertyPagedList",
      data: payload,
    })
      .then((response) => response.data.result)
      .catch((err) => Promise.reject(err));
  };
}
// export const getProperty = (
//   payload: ICategoryPayload
// ): Promise<ICategorySettings> =>
//   axios
//     .post("Marketplace/GetMarketplacePropertyAutocomplete", payload)
//     .then((res) => res.data.result);
