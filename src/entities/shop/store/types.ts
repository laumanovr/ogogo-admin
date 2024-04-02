import { WithResultPagination } from "@/shared/api/api.types";
import { ShopEntity } from "../model/types";
import { Nullable } from "@/shared/lib/utils/nullable";
import { VerifyShopPayload } from "../api/types";

export interface ShopState {
  shopPagedList: WithResultPagination<ShopEntity>;
  openedShop: Nullable<ShopEntity>;
  verifyInfo: Nullable<VerifyShopPayload>;
}
