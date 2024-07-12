import { BaseHandler } from "@/shared/router/middleware/auth.type";

export class AccessRequestMiddleware extends BaseHandler {
  handle(): void {}
}

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
