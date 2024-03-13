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

export const enum LoadingStatusEnum {
  VIRGIN = "VIRGIN",
  INITIAL_LOADING = "INITIAL_LOADING",
  SENDING = "SENDING",
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export type Autocomplete = {
  id: string;
  value: string;
  description: string;
};
