import { getErrorMessageByCode } from "@/utils/error";
import {
  NotificationState,
  NotificationPayload,
  ErrorNotificationPayload,
  ValidationErrors,
  ResultError,
} from "./types";

import axios from "axios";
import { i18n } from "@/shared/plugins/i18n";
import { isResultError, isValidationErrors } from "./guards";

export const mutationTypes = {
  closeNotification: "[notification] closeNotification",
  openNotification: "[notification] openNotification",
};

export const actionTypes = {
  addNotification: "[notification] addNotification",
  addErrorNotification: "[notification] addErrorNotification",
  addSuccessNotification: "[notification] addSuccessNotification",
};

export default {
  state: {
    isOpen: false,
    text: null,
    color: null,
    timeout: true,
    source: null,
  },
  mutations: {
    [mutationTypes.closeNotification](state: NotificationState) {
      state.isOpen = false;
      setTimeout(() => {
        state.color = null;
        state.text = null;
      }, 150);
    },
    [mutationTypes.openNotification](state: NotificationState, payload) {
      state.isOpen = true;
      state.text = payload.text;
      state.color = payload.color;
      state.timeout = payload.timeout ?? true;
      state.source = payload.source ?? null;
    },
  },
  actions: {
    [actionTypes.addNotification]({ commit }, payload: NotificationPayload) {
      commit(mutationTypes.openNotification, payload);
    },
    [actionTypes.addErrorNotification](
      { commit },
      payload: string | ErrorNotificationPayload | Error
    ) {
      let errorMessage;

      if (axios.isAxiosError(payload)) {
        const responseData: ResultError | ValidationErrors =
          payload?.response?.data;
        if (isResultError(responseData)) {
          const { error } = responseData;
          errorMessage = error.additionalInfo
            ? `${error.errorMessage}: ${error.additionalInfo}`
            : error.errorMessage ??
              getErrorMessageByCode(error.errorCode) ??
              i18n.t("validations.unknownError");
        } else if (isValidationErrors(responseData)) {
          const { errors } = responseData;
          errorMessage = Object.keys(errors).length
            ? errors[Object.keys(errors)[0]].length
              ? errors[Object.keys(errors)[0]][0]
              : i18n.t("validations.unknownError")
            : i18n.t("validations.unknownError");
        }
      } else if (payload instanceof Error && payload.message) {
        errorMessage = payload.message;
      } else if (typeof payload === "string") {
        errorMessage = payload;
      } else {
        errorMessage = i18n.t("validations.unknownError");
      }
      commit(mutationTypes.openNotification, {
        text: errorMessage,
        color: "error",
      });
    },
    [actionTypes.addSuccessNotification]({ commit }, payload: string) {
      commit(mutationTypes.openNotification, {
        text: payload,
        color: "success",
      });
    },
  },
};
