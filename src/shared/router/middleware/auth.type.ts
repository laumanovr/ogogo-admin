import { Component } from "vue";
import type { RouteLocationNormalized } from "vue-router";

export interface IHandler {
  nextHandler: IHandler | null;
  handle(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: Function,
    routes: IRoute[]
  ): void;
  setNext(h: IHandler): void;
  handleLast(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: Function,
    routes: IRoute[]
  ): void;
}

export class BaseHandler implements IHandler {
  nextHandler: IHandler = null;

  handle(): void {}

  setNext(h: IHandler): void {
    this.nextHandler = h;
  }

  handleLast() {}
}

export interface IRoute {
  name?: string;
  path?: string;
  label?: string;
  component?: Component;
  children?: IRoute[];
  meta: IRouteMeta;
  expandedBySearch?: boolean;
}

export interface IRouteMeta {
  requiresAuth: Boolean;
  layout: string;

  uuid: string;
  default?: boolean;
  isFolder?: boolean;
  ignorePermission?: boolean;

  isPath: Boolean;
  renderTree: Boolean;
  transform: {
    ignorePath: Boolean;
    ignoreName: Boolean;
  };
}
