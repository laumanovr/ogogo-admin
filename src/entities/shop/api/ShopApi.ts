import { API } from "@/shared/lib/plugins/axios";
import { singleton } from "tsyringe";
import {
  ShopEntity,
  GetShopPagedListPayload,
  UpdateShopPayload,
  VerifyShopPayload,
} from "..";
import { WithResultPagination } from "@/shared/api/api.types";

@singleton()
export class ShopApi {
  getShopPagedList = (
    payload: GetShopPagedListPayload
  ): Promise<WithResultPagination<ShopEntity>> => {
    return API({
      method: "POST",
      url: "/Marketplace/GetMarketplaceShopPagedList",
      data: payload,
    })
      .then((response) => response.data.result)
      .catch((err) => Promise.reject(err));
  };

  getShopById = (id: string): Promise<ShopEntity> => {
    return API({
      method: "GET",
      url: `/Marketplace/GetMarketplaceShop?id=${id}`,
    })
      .then((response) => response.data.result)
      .catch((err) => Promise.reject(err));
  };

  updateShop = (payload: UpdateShopPayload): Promise<ShopEntity> => {
    return API({
      method: "PUT",
      url: "/Marketplace/UpdateMarketplaceShop",
      data: payload,
    })
      .then((response) => response.data.result)
      .catch((err) => Promise.reject(err));
  };

  verifyShop = (payload: VerifyShopPayload): Promise<ShopEntity> => {
    return API({
      method: "PUT",
      url: "/Marketplace/VerifyMarketplaceShop",
      data: payload,
    }).then((response) => response.data.result);
  };
}
