export enum MENU_ITEMS {
  Category = "category",
  Stores = "shops",
  Products = "products",
  Properties = "property",
}

export enum PropertyRenderType {
  Image = 14200,
  Text = 14201,
}

export enum Mode {
  create = "create",
  update = "update",
}

export enum ProductStatus {
  ALL = 0,
  DRAFT = 14800,
  PUBLISHED = 14801,
  AWAITING_MODERATION = 14802,
  AWAITING_APPROVE_TO = 14803,
  APPROVED = 14804,
  ARCHIVED = 14805,
  REQUIRE_IMPROVEMENT = 14806,
  BLOCKED = 14807,
}
