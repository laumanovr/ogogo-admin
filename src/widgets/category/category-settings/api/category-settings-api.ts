import axios from "axios";
import {
  ICategoryPayload,
  ICategorySettings,
} from "./category-settings-api.types";

export const saveCategorySettings = (
  payload: ICategoryPayload
): Promise<ICategorySettings> =>
  axios
    .post("Marketplace/CreateMarketplaceCategory", payload)
    .then((res) => res.data);

export const getCategoryById = (id: string): Promise<ICategorySettings> =>
  axios
    .get(`Marketplace/GetMarketplaceCategory/`, {
      params: id,
    })
    .then((res) => res.data);

export const getMarketplaceCategories = (
  id: string
): Promise<ICategorySettings[]> =>
  axios
    .get(`Marketplace/GetMarketplaceCategories/`, {
      params: id,
    })
    .then((res) => res.data);
