import i18n from "@/shared/lib/plugins/i18n";

const { t } = i18n.global;

const errorCodeKeys = Object.keys(t("selects.error-codes"));

export enum ErrorCodeEnum {
  UserNotFound = "UserNotFound",
  InvalidDateIssueOfFinancing = "InvalidDateIssueOfFinancing",
  KnoxError = "KnoxError",
  NoIMEICodeSpecifiedАorPhone = "NoIMEICodeSpecifiedАorPhone",
  NeedKnoxActivating = "NeedKnoxActivating",
  ApplicationBlocked = "ApplicationBlocked",
  DarekServiceUnavailable = "DarekServiceUnavailable",
  FaceImageNotUploaded = "FaceImageNotUploaded",
}

export default function getCustomErrorMessage(errorCode: ErrorCodeEnum) {
  if (errorCodeKeys.includes(errorCode)) {
    return t(`selects.error-codes.${errorCode}`);
  }
  return null;
}
