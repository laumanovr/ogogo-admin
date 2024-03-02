import { API } from "@/shared/lib/plugins/axios";
import { ICategorySettings } from "./index.types";

export const getCategoryById = (id: string): Promise<ICategorySettings> =>
  API.get(`Marketplace/GetMarketplaceCategory`, {
    params: { id },
  }).then((res) => res.data.result);
