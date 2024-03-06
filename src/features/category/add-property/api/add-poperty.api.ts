import { ICategorySettings } from "@/shared/api/category/index.types";
import { ICategoryPayload } from "@/widgets/category/category-settings/api/category-settings-api.types";
import axios from "axios";

export const getProperty = (
  payload: ICategoryPayload
): Promise<ICategorySettings> =>
  axios
    .post("Marketplace/GetMarketplacePropertyAutocomplete", payload)
    .then((res) => res.data.result);
