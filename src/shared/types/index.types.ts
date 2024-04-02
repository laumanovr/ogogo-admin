export interface IPageQuery {
  pageIndex: number;
  pageSize: number;
}

export interface IItemListInfo extends IPageQuery {
  totalCount: number;
  totalPages: number;
}
export interface IItemList<T> extends IItemListInfo {
  items: T[];
}
