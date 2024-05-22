import { ProductEntity, ProductDetailEntity } from "../model/types";

export interface IProductState {
  moderationProducts: ProductEntity[];
  totalCount: number;
  selectedProduct: ProductDetailEntity;
}
