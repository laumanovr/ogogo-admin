import axios from "axios";
import { ICategory } from "./index.types";

export const getMarketlace = (): Promise<ICategory[]> =>
  axios
    .get(`Marketplace/GetMarketplaceCategories`)
    .then((res) => res.data.result);
