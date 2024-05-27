import { ProductEntity, ProductDetailEntity } from "../model/types";

export interface IProductState {
  moderationProducts: ProductEntity[];
  totalCount: number;
  selectedProduct: ProductDetailEntity;
  verificationData: {
    id: string;
    verifierComment: string;
    validationDetails: {
      fields: {
        name: {
          validationComment: string;
          verified: boolean;
        };
        description: {
          validationComment: string;
          verified: boolean;
        };
        price: {
          validationComment: string;
          verified: boolean;
        };
        countOfProduct: {
          validationComment: string;
          verified: boolean;
        };
      };
      files: {
        photo: {
          validationComment: string;
          verified: boolean;
        };
        video: {
          validationComment: string;
          verified: boolean;
        };
      };
      properties: object;
    };
  };
}
