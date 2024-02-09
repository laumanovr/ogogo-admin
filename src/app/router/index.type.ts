import { Dictionary } from "lodash";
import { RouteMeta, RouteRecord } from "vue-router";

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

export const INTERCEPTOR_EXCLUDE_LIST_ERROR_CODES = [
  ErrorCodeEnum.InvalidDateIssueOfFinancing,
  // ErrorCodeEnum.KnoxError,
  // ErrorCodeEnum.NoIMEICodeSpecifiedАorPhone, // turn off errors for select-fi/update products on imei add
  ErrorCodeEnum.NeedKnoxActivating,
  ErrorCodeEnum.DarekServiceUnavailable,
  ErrorCodeEnum.FaceImageNotUploaded,
];

export interface Route {
  path: string;
  name?: string | null;
  hash: string;
  query: Dictionary<string | (string | null)[]>;
  params: Dictionary<string>;
  fullPath: string;
  matched: RouteRecord[];
  redirectedFrom?: string;
  meta?: RouteMeta;
}
