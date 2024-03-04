export interface IItemListInfo {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}
export interface IItemList<T> extends IItemListInfo {
  items: T[];
}
