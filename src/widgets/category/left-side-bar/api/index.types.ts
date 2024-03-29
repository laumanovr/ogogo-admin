import { ICategory as ICategoryShared } from "@/shared/store/category/index.types";

export interface ICategory extends ICategoryShared {
  id: string;
  categoryName: string;
  childMarketplaceCategories?: ICategory[];
}
