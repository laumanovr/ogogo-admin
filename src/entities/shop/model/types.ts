import { Nullable } from "@/shared/lib/utils/nullable";

export type ShopEntity = {
  id: string;
  name: Nullable<string>;
  logoBase64: Nullable<string>;
  logoFileName: Nullable<string>;
  logoFileSize: Nullable<number>;
  description: Nullable<string>;
  verificationStatus: PRODUCT_VERIFICATION_STATUS;
  moderatorId: Nullable<number>;
  moderatorName: Nullable<string>;
  moderationDate: Nullable<string | Date>;
  moderationResult: TrademarkModerationResult;
  version: number;
};

export const enum PRODUCT_VERIFICATION_STATUS {
  NONE = 0,
  VERIFIED = 14300,
  UNVERIFIED = 14301,
  UNKNOWN = 14302,
}

export type TrademarkModerationResult = {
  name: ValidationDetail;
  logo: ValidationDetail;
  description: ValidationDetail;
};

type ValidationDetail = {
  isRejected: boolean;
  verified: boolean;
  userId: Nullable<number>;
  validateDateTime: Nullable<string>;
  validationComment: Nullable<string>;
};
