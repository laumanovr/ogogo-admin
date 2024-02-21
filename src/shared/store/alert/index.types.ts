import type { FunctionalComponent } from "vue";

export interface IAlertState {
  topLeft: IAlert[];
  topRight: IAlert[];
  bottomLeft: IAlert[];
  bottomRight: IAlert[];
  top: IAlert[];
  bottom: IAlert[];
  left: IAlert[];
  right: IAlert[];
  center: IAlert[];
  successMessage: IAlert,
  errorMessage: IAlert,
  infoMessage: IAlert,
}

export interface IAlert {
  successMessage: null,
  errorMessage: null,
  infoMessage: null,
  id: string;
  message: string;
  caption: string;
  group: boolean | string | number;
  groupId: string;
  multiLine: boolean;
  position: AlertPositionEnum;
  actions: IAlertAction[];
  progress: boolean;
  circularProgress: boolean;
  transition: string;
  timeout: number; // в секундах
  // v-alert options
  alertOptions: Partial<IAlertOptions>;
  // v-badge
  badgeOptions: Partial<IBadgeOptions>;
  // v-progress-circular
  circularProgressOptions: Partial<ICircularProgressOptions>;
}

export interface IAlertAction {
  label: string;
  color: string;
  handler: () => void;
}

export interface IAlertOptions {
  border: boolean | "top" | "end" | "bottom" | "start";
  "border-color": string;
  closable: boolean;
  "close-icon": string;
  "close-label": string;
  color: string;
  density: "default" | "comfortable" | "compact";
  elevation: number | string;
  height: number | string;
  icon: false | string | (new () => any) | FunctionalComponent;
  location: Anchor;
  "max-height": number | string;
  "max-width": number | string;
  "min-height": number | string;
  "min-width": number | string;
  "model-value": boolean;
  prominent: boolean;
  rounded: boolean | string;
  tag: string;
  text: string;
  theme: string;
  title: string;
  type: "success" | "info" | "warning" | "error";
  variant: "flat" | "elevated" | "tonal" | "outlined" | "text" | "plain";
  width: number | string;
}

export interface IBadgeOptions {
  bordered: boolean;
  color: string;
  content: string | number;
  dot: boolean;
  floating: boolean;
  icon: string | (new () => any) | FunctionalComponent;
  inline: boolean;
  label: string;
  location: Anchor;
  max: number | string;
  "model-value": boolean;
  "offset-x": number | string;
  "offset-y": number | string;
  rounded: number | string | boolean;
  tag: string;
  "text-color": string;
  theme: string;
  transition: string;
}

export interface ICircularProgressOptions {
  "bg-color": string;
  color: string;
  indeterminate: boolean | "disable-shrink";
  "model-value": string | number;
  rotate: string | number;
  size: string | number;
  tag: string;
  theme: string;
  width: string | number;
}

export interface IAlertParams extends Partial<Omit<IAlert, "id" | "groupId">> {
  message: string;
}

// Anchor
const block = ["top", "bottom"] as const;
const inline = ["start", "end", "left", "right"] as const;
type Tblock = (typeof block)[number];
type Tinline = (typeof inline)[number];
export type Anchor =
  | Tblock
  | Tinline
  | "center"
  | "center center"
  | `${Tblock} ${Tinline | "center"}`
  | `${Tinline} ${Tblock | "center"}`;

export enum AlertPositionEnum {
  "TopLeft" = "TopLeft",
  "TopRight" = "TopRight",
  "BottomLeft" = "BottomLeft",
  "BottomRight" = "BottomRight",
  "Top" = "Top",
  "Bottom" = "Bottom",
  "Left" = "Left",
  "Right" = "Right",
  "Center" = "Center",
}
