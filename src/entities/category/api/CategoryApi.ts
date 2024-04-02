import { API } from "@/shared/lib/plugins/axios";
import { singleton } from "tsyringe";
import {
  CategoryEntity,
  CategoryTreeEntity,
  CreateCategoryPayload,
  PropertyValueAutocomplete,
  PropertyValueAutocompletePayload,
  UpdateCategoryPayload,
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

  updateCategory = (payload: UpdateCategoryPayload): Promise<CategoryEntity> =>
    API.put("Marketplace/UpdateMarketplaceCategory", payload).then(
      (res) => res.data.result
    );

  getCategories = (): Promise<CategoryTreeEntity[]> =>
    API.get("Marketplace/GetMarketplaceCategories").then(
      (res) => res.data.result
    );

  getPropertyValueAutocomplete = (
    payload: PropertyValueAutocompletePayload
  ): Promise<PropertyValueAutocomplete[]> =>
    API.post(
      `Marketplace/GetMarketplacePropertyValueAutocomplete`,
      payload
    ).then((res) => res.data.result);
}
