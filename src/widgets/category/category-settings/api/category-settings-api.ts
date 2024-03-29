import { API } from "@/shared/lib/plugins/axios";
import { ICategoryPayload } from "./category-settings-api.types";
import { ICategorySettings } from "@/shared/api/category/index.types";
import { singleton } from "tsyringe";

@singleton()
export class CategorySettingsApi {
  saveCategorySettings = (
    payload: ICategoryPayload
  ): Promise<ICategorySettings> =>
    API.post("Marketplace/CreateMarketplaceCategory", payload).then(
      (res) => res.data.result
    );
  updateCategorySettings = (
    payload: ICategoryPayload
  ): Promise<ICategorySettings> =>
    API.put("Marketplace/UpdateMarketplaceCategory", payload).then(
      (res) => res.data.result
    );
  getMarketplaceCategories = (id: string): Promise<ICategorySettings[]> =>
    API.get(`Marketplace/GetMarketplaceCategories/`, {
      params: id,
    }).then((res) => res.data);
}
