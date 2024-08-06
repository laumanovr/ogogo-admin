export interface ProductEntity {
  id: string;
  productName: string;
  productType: number;
  status: number;
  iconBase64: string;
  verifierDate: string;
  verifierId: number;
  verifierName: string;
  shopId: string;
  shopName: string;
  shopIconBase64: string;
  changes: string;
}

export interface ProductDetailEntity {
  id?: string;
  articleNumber?: string;
  productName?: string;
  description?: string;
  categoryId?: string;
  price?: number;
  productType?: number;
  properties?: object;
  ownerOrganizationId?: string;
  status?: number;
  verificationStatus?: number;
  verifierId?: number;
  verifierDate?: string;
  isRejected?: boolean;
  verifierComment?: string;
  validationDetails?: ValidationObject;
  toArticle?: string;
  priceType?: number;
  countOfProduct?: number;
  photos?: string[];
  videos?: string[];
}

export interface ISelectedShop {
  name?: string;
  logoBase64?: string;
}

export interface ValidationObject {
  fields: {
    name: {
      validationComment?: string;
      moderationDate?: string;
      verified?: boolean;
    };
    description: {
      validationComment?: string;
      moderationDate?: string;
      verified?: boolean;
    };
    price: {
      validationComment?: string;
      moderationDate?: string;
      verified?: boolean;
    };
    countOfProduct: {
      validationComment?: string;
      moderationDate?: string;
      verified?: boolean;
    };
  };
  files: {
    photo: {
      validationComment?: string;
      moderationDate?: string;
      verified?: boolean;
    };
    video: {
      validationComment?: string;
      moderationDate?: string;
      verified?: boolean;
    };
  };
  properties?: object;
}

export interface ValidationField {
  name: string;
  description: string;
  price: string;
  countOfProduct: string;
}

export interface ValidationFile {
  photo: string;
  video: string;
}

export const enum PRODUCT_STATUS {
  PUBLISHED = 14801,
  PENDING = 14802,
  REJECTED = 14806,
}
