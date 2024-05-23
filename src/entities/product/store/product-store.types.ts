import { ProductEntity, ProductDetailEntity } from "../model/types";

export interface IProductState {
  moderationProducts: ProductEntity[];
  totalCount: number;
  selectedProduct: ProductDetailEntity;
  verificationData: {
    id?: string;
    verifierComment?: string;
    validationDetails?: {
      fields: {
        productName: {
          validationComment: string;
          verified: false;
        };
        description: {
          validationComment: "string";
          verified: false;
        };
        price: {
          validationComment: "string";
          verified: false;
        };
        countOfProduct: {
          validationComment: "string";
          verified: false;
        };
      };
      files: object;
      properties: object;
    };
  };
}
