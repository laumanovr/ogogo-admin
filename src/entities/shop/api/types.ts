import {
  BasePageParams,
  ResponseWithStatus,
  SORT_DIRECTION,
  WithPagination,
} from "@/shared/api/api.types";
import { ShopEntity, TrademarkModerationResult } from "../model/types";

export type GetShopPagedListPayload = BasePageParams & {
  search?: string;
  sortDirection: SORT_DIRECTION;
  queryParams?: any; // TODO: change when backend done
};

export type GetShopPagedListResponse = ResponseWithStatus<
  WithPagination<ShopEntity>
>;

export type GetShopResponse = ResponseWithStatus<ShopEntity>;

export type UpdateShopPayload = Pick<
  ShopEntity,
  "id" | "name" | "logoBase64" | "description"
>;

export type UpdateShopResponse = ResponseWithStatus<ShopEntity>;

export type VerifyShopPayload = {
  id: string;
  moderationResult: VerifyModerationResult;
};

type VerifyModerationResult = TrademarkModerationResult;

export type VerifyShopResponse = ResponseWithStatus<ShopEntity>;
