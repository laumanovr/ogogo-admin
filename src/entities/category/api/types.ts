export type CreateCategoryPayload = {
  categoryName: string;
  categoryNameKy: string;
  categoryNameEn: string;
  parentId: string;
  sequenceNumber: number;
  properties: any[]; // TODO: replace with real data
  icoBase64: string | ArrayBuffer;
  imageId: string;
};

export type UpdateCategoryPayload = CreateCategoryPayload & {
  id: string;
};
