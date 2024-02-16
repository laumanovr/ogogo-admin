import { ref } from "vue";
import lodash from "lodash";
import { v4 as uuid } from "uuid";
import i18n from "@/shared/lib/plugins/i18n";

import { useAlertStore } from "@/shared/store/alert/index";
import type { IAlertParams, IAlert } from "@/shared/lib/utils/alert.types";

export const useAlert = () => ({
  notify(newAlert: string | IAlertParams) {
    const currentAlert = ref(
      new Alert(typeof newAlert === "string" ? { message: newAlert } : newAlert)
    );
    if (currentAlert.value.alert.group) {
      currentAlert.value.replace();
    } else {
      currentAlert.value.add();
    }
    return (updatedAlert: string | Partial<IAlertParams> | undefined) => {
      if (typeof updatedAlert === "undefined") {
        currentAlert.value.delete();
      } else {
        currentAlert.value.update(
          typeof updatedAlert === "string"
            ? { message: updatedAlert }
            : updatedAlert
        );
      }
    };
  },
});

export class Alert {
  alertStore: ReturnType<typeof useAlertStore>;
  alerts: IAlert[];
  alert: IAlert;
  alertIndex: number;

  constructor(alert: Partial<IAlertParams>) {
    this.alertStore = useAlertStore();
    this.alert = this.getNewAlert(alert);
    this.alerts = this.getAlerts(this.alert.position);
    this.alertIndex = this.getIndex(this.alert);
  }
  getNewAlert(alert: Partial<IAlertParams>): IAlert {
    const newAlert: IAlert = lodash.merge(
      JSON.parse(JSON.stringify(alertDefaults)),
      alert
    );
    newAlert.id = uuid();
    newAlert.multiLine =
      Array.isArray(newAlert.actions) && newAlert.actions.length > 1;
    newAlert.groupId = newAlert.group ? this.generateGroupId(newAlert) : "";
    return newAlert;
  }
  add() {
    switch (this.alert.position) {
      case AlertPositionEnum.TopLeft:
      case AlertPositionEnum.TopRight:
      case AlertPositionEnum.Top:
        this.alert.transition = "slide-top";
        this.alerts.unshift(this.alert);
        break;
      case AlertPositionEnum.BottomLeft:
      case AlertPositionEnum.BottomRight:
      case AlertPositionEnum.Bottom:
        this.alert.transition = "slide-bottom";
        this.alerts.push(this.alert);
        break;
      case AlertPositionEnum.Left:
      case AlertPositionEnum.Right:
      case AlertPositionEnum.Center: {
        const start = JSON.parse(JSON.stringify(this.alerts));
        const end = start.splice(Math.floor(start.length / 2));
        this.alert.transition = "scale-center";
        this.alerts.splice(
          0,
          this.alerts.length,
          ...start.concat(this.alert, end)
        );
        break;
      }
      default:
        this.alerts.push(this.alert);
    }
  }
  replace() {
    if (this.alertIndex === -1) {
      this.add();
    } else {
      if (this.alert.group) {
        const group = this.alerts[this.alertIndex];
        const groupBadgeOptions = group.badgeOptions;
        const alertBadgeOptions = this.alert.badgeOptions;
        if (
          typeof alertBadgeOptions.content === "number" &&
          typeof groupBadgeOptions.content === "number"
        ) {
          alertBadgeOptions.content += groupBadgeOptions.content;
        }
        if (
          this.alert.message !==
          i18n.global.t("lang-d88db45e-eeb8-46ab-a4ce-d2af69c30b63")
        ) {
          alertBadgeOptions["model-value"] = true;
        } else {
          alertBadgeOptions["model-value"] = false;
        }
        this.alert.id = group.id;
      }
      this.alerts.splice(this.alertIndex, 1, this.alert);
    }
  }
  delete() {
    this.alerts.splice(this.alertIndex, 1);
  }
  update(alert: Partial<IAlert>) {
    this.alert = lodash.merge(this.alert, JSON.parse(JSON.stringify(alert)));
    this.alertIndex = this.getIndex(this.alert);
    this.replace();
  }
  generateGroupId(alert: IAlert) {
    let group = `message=${alert.message} + caption=${alert.caption} + multiLine=${alert.multiLine} + position=${alert.position}`;
    if (Array.isArray(alert.actions) && alert.actions.length)
      alert.actions.forEach((action) => (group += action.label));
    return group;
  }
  getAlerts(alertPosition: AlertPositionEnum) {
    switch (alertPosition) {
      case AlertPositionEnum.TopLeft:
        return this.alertStore.getTopLeft;
      case AlertPositionEnum.TopRight:
        return this.alertStore.getTopRight;
      case AlertPositionEnum.BottomLeft:
        return this.alertStore.getBottomLeft;
      case AlertPositionEnum.BottomRight:
        return this.alertStore.getBottomRight;
      case AlertPositionEnum.Top:
        return this.alertStore.getTop;
      case AlertPositionEnum.Bottom:
        return this.alertStore.getBottom;
      case AlertPositionEnum.Left:
        return this.alertStore.getLeft;
      case AlertPositionEnum.Right:
        return this.alertStore.getRight;
      case AlertPositionEnum.Center:
        return this.alertStore.getCenter;
      default:
        return this.alertStore.getBottomRight;
    }
  }
  getIndex(alert: IAlert) {
    return this.alerts.findIndex((e) =>
      alert.group ? alert.groupId === e.groupId : alert.id === e.id
    );
  }
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

const alertDefaults: IAlert = {
  id: "",
  message: "",
  caption: "",
  group: true,
  groupId: "",
  multiLine: false,
  position: AlertPositionEnum.BottomRight,
  actions: [],
  progress: false,
  circularProgress: false,
  transition: "slide-bottom",
  timeout: 5000,
  // v-alert options
  alertOptions: {
    border: false,
    "border-color": undefined,
    closable: true,
    "close-icon": "$cancel",
    "close-label": "$vuetify.close",
    color: undefined,
    density: "default",
    elevation: undefined,
    height: undefined,
    icon: false,
    location: undefined,
    "max-height": undefined,
    "max-width": "600px",
    "min-height": undefined,
    "min-width": undefined,
    "model-value": true,
    prominent: false,
    rounded: false,
    tag: "div",
    text: undefined,
    theme: undefined,
    title: undefined,
    type: undefined,
    variant: "flat",
    width: undefined,
  },
  // v-badge
  badgeOptions: {
    bordered: false,
    color: "red",
    content: 1,
    dot: false,
    floating: false,
    icon: undefined,
    inline: false,
    label: "$vuetify.badge",
    location: "top start",
    max: undefined,
    "model-value": false,
    "offset-x": undefined,
    "offset-y": undefined,
    rounded: false,
    tag: "div",
    "text-color": undefined,
    theme: undefined,
    transition: "scale-rotate-transition",
  },
  // v-progress-circular
  circularProgressOptions: {
    "bg-color": undefined,
    color: undefined,
    indeterminate: false,
    "model-value": 0,
    rotate: 0,
    size: "default",
    tag: "div",
    theme: undefined,
    width: 4,
  },
};
