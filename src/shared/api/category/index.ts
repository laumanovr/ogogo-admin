import axios from "axios";
import { ICategorySettings } from "./index.types";

export const getCategoryById = (id: string): Promise<ICategorySettings> =>
  axios
    .get(`Marketplace/GetMarketplaceCategory`, {
      params: { id },
    })
    .then((res) => res.data.result);
