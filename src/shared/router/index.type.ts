import { Dictionary } from "lodash";
import { RouteMeta, RouteRecord } from "vue-router";

export interface Route {
  path: string;
  name?: string | null;
  hash: string;
  query: Dictionary<string | (string | null)[]>;
  params: Dictionary<string>;
  fullPath: string;
  matched: RouteRecord[];
  redirectedFrom?: string;
  meta?: RouteMeta;
}

export const enum Routes {
  category = "/category",
  property = "/property",
  login = "/",
  shops = "/shops",
  products = "/products",
}
