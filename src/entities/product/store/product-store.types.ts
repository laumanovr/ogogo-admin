import { ProductEntity, ProductDetailEntity, ISelectedShop, ValidationObject } from "../model/types";

export interface IProductState {
  moderationProducts: ProductEntity[];
  totalCount: number;
  selectedProduct: ProductDetailEntity;
  selectedProductShop: ISelectedShop;
  verificationData: {
    id: string;
    verifierComment: string;
    validationDetails: ValidationObject
  };
}
