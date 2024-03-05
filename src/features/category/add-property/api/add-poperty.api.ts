import axios from "axios";

export const getProperty = (
  payload: ICategoryPayload
): Promise<ICategorySettings> =>
  axios
    .post("Marketplace/GetMarketplacePropertyAutocomplete", payload)
    .then((res) => res.data.result);
