import axios from "axios";
import { ICategoryPayload } from "./category-settings-api.types";
import { ICategorySettings } from "@/shared/api/category/index.types";

export const saveCategorySettings = (
  payload: ICategoryPayload
): Promise<ICategorySettings> =>
  axios
    .post("Marketplace/CreateMarketplaceCategory", payload)
    .then((res) => res.data.result);

export const getMarketplaceCategories = (
  id: string
): Promise<ICategorySettings[]> =>
  axios
    .get(`Marketplace/GetMarketplaceCategories/`, {
      params: id,
    })
    .then((res) => res.data);
