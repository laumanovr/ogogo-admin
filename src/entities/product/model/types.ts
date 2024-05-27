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

interface ValidationObject {
  fields: {
    name: {
      validationComment?: string;
      moderationDate?: string;
    };
    description: {
      validationComment?: string;
      moderationDate?: string;
    };
    price: {
      validationComment?: string;
      moderationDate?: string;
    };
    countOfProduct: {
      validationComment?: string;
      moderationDate?: string;
    };
  };
}

export interface ValidationField {
  name: object;
  description: object;
  price: object;
  countOfProduct: object;
}
