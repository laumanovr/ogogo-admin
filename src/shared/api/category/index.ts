import { API } from "@/shared/lib/plugins/axios";
import { ICategorySettings } from "./index.types";
import { singleton } from "tsyringe";

@singleton()
export class CategoryApi {
  getCategoryById = (id: string): Promise<ICategorySettings> =>
  API.get(`Marketplace/GetMarketplaceCategory`, {
    params: { id },
  }).then((res) => res.data.result);
}