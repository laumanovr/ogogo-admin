import { Nullable } from "../lib/utils/nullable";

export interface Pagination {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}
export interface WithPagination<T> extends Pagination {
  items: T[];
}

export const enum ErrorCodeEnum {}

export const INTERCEPTOR_EXCLUDE_LIST_ERROR_CODES: ErrorCodeEnum[] = [];

export const enum HttpCodes {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export const TOKEN_KEY = "sessionId";

export const enum LOADING_STATUS_ENUM {
  VIRGIN = "VIRGIN",
  INITIAL_LOADING = "INITIAL_LOADING",
  SENDING = "SENDING",
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export const enum SORT_DIRECTION_ENUM {
  ASCENDING = 0,
  DESCENDING = 1,
}

export type LocalAutocomplete = {
  id: string;
  value: string;
  description: string;
};

export type AutocompleteEntity = {
  id: string;
  value: string;
  description: string;
};

export interface ResultError {
  errorMessage: string;
  errorCode: string;
  additionalInfo: string;
  applicationStatus: string;
  number: string;
}

export interface ResponseWithStatus<T> {
  ok: boolean;
  error: ResultError;
  result: T;
}

export interface BasePageParams {
  pageIndex: number;
  pageSize: number;
}

export interface BaseCreateAndUpdateData {
  createdAt: string;
  createdBy: Nullable<number>;
  updatedAt: Nullable<string>;
  updatedBy: Nullable<number>;
}
