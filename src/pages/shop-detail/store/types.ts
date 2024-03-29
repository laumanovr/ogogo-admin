export type ShopDetailState = {
  logoStatus: DETAIL_STATUS;
  nameStatus: DETAIL_STATUS;
  descriptionStatus: DETAIL_STATUS;
};

export enum DETAIL_STATUS {
  INITIAL = "INITIAL",
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  READ = "READ",
}
