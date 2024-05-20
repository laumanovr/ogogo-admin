import {
  BasePageParams,
  ResponseWithStatus,
  WithPagination,
} from "@/shared/api/api.types";
import { ProductEntity } from "../model/types";

export interface ProductPayload extends BasePageParams {
  search?: string;
}

export type ProductApiResponse = ResponseWithStatus<
  WithPagination<ProductEntity>
>;
