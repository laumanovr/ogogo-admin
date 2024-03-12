import i18n from "@/shared/lib/plugins/i18n";
import axios from "axios";

import {
  HttpCodes,
  INTERCEPTOR_EXCLUDE_LIST_ERROR_CODES,
} from "@/shared/api/api.types";
import { useAuthStore } from "@/shared/store/auth";

import router from "@/shared/router";
import { Routes } from "@/shared/router/index.type";

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER,
});

function isExcludedErrorCode(error: unknown) {
  if (!axios.isAxiosError(error)) throw new Error("Error is not axios error");
  const errorCode = error?.response?.data?.error?.errorCode;
  if (errorCode && INTERCEPTOR_EXCLUDE_LIST_ERROR_CODES.includes(errorCode))
    return true;
  return false;
}

API.interceptors.request.use(
  function (config) {
    const authStore = useAuthStore();
    const token = authStore.getSessionId;
    config.headers.Authorization = token ? `Bearer ${token}` : "";

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (isExcludedErrorCode(error)) return Promise.reject(error);

    const certificatePing = error?.response?.request?.responseURL?.includes(
      "certificate-ping.txt"
    );
    const { t } = i18n.global;
    const authStore = useAuthStore();

    if (certificatePing) {
      return Promise.reject(error);
    } else {
      let showError = true;

      switch (error?.response?.status) {
        case HttpCodes.BAD_REQUEST:
          showError = false;
          await authStore.logout();

          await router.push(Routes.login);
          break;
        case HttpCodes.UNAUTHORIZED:
          showError = false;
          await authStore.logout();
          await router.push(Routes.login);
          break;
        case HttpCodes.FORBIDDEN:
          alert(t("lang-cd753f43-d3f9-44c8-8ad6-c383e6281497"));
          break;
        case HttpCodes.INTERNAL_SERVER_ERROR:
          alert(t("label-5a8130e9-116a-4c54-8be2-166380fae5d1"));
          break;
      }
      return Promise.reject(error);
    }
  }
);
