import { API } from "@/shared/lib/plugins/axios";
import { singleton } from "tsyringe";
import {
  CategoryEntity,
  CategoryTreeEntity,
  CreateCategoryPayload,
} from "@/entities/category";

@singleton()
export class CategoryApi {
  getCategoryById = (id: string): Promise<CategoryEntity> =>
    API.get("Marketplace/GetMarketplaceCategory", {
      params: { id },
    }).then((res) => res.data.result);

  createCategory = (payload: CreateCategoryPayload): Promise<CategoryEntity> =>
    API.post("Marketplace/CreateMarketplaceCategory", payload).then(
      (res) => res.data.result
    );

  getCategories = (): Promise<CategoryTreeEntity[]> =>
    API.get("Marketplace/GetMarketplaceCategories").then(
      (res) => res.data.result
    );
}
