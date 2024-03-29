import { API } from "@/shared/lib/plugins/axios";
import { ICategory } from "./index.types";

export const getMarketlace = (): Promise<ICategory[]> =>
  API.get(`Marketplace/GetMarketplaceCategories`).then(
    (res) => res.data.result
  );
