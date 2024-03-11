import { API } from "@/shared/lib/plugins/axios";
import { ICategoryPayload } from "./category-settings-api.types";
import { ICategorySettings } from "@/shared/api/category/index.types";

export const saveCategorySettings = (
  payload: ICategoryPayload
): Promise<ICategorySettings> =>
  API.post("Marketplace/CreateMarketplaceCategory", payload).then(
    (res) => res.data.result
  );

export const getMarketplaceCategories = (
  id: string
): Promise<ICategorySettings[]> =>
  API.get(`Marketplace/GetMarketplaceCategories/`, {
    params: id,
  }).then((res) => res.data);
