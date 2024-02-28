export interface ICategoryPageState {
  leftSideBarhierarchy: ICategory[];
}

export interface ICategory {
  title: string;
  childMarketplaceCategoryIdList: ICategory[];
}
