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
  validationDetails?: object;
  toArticle?: string;
  priceType?: number;
  countOfProduct?: number;
  photos?: string[];
  videos?: string[];
}

export interface ValidationField {
  productName: object;
  description: object;
  price: object;
  countOfProduct: object;
}
