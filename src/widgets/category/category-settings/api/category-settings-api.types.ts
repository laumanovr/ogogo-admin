import { ICategory } from "../store/category-settings-store.types";

export interface Translations {
  additionalProp1: string;
  additionalProp2: string;
  additionalProp3: string;
}

export type ICategoryPayload = Partial<
  Pick<ICategory, "parentId" | "sequenceNumber" | "propertySetId">
> &
  Omit<ICategory, "parentId" | "sequenceNumber" | "propertySetId">;
