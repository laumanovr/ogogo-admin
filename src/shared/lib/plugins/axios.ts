import i18n from "@/shared/lib/plugins/i18n";
import axios from "axios";

import {
  HTTP_CODES,
  INTERCEPTOR_EXCLUDE_LIST_ERROR_CODES,
} from "@/shared/api/api.types";
import { useAuthStore } from "@/shared/store/auth";

import router from "@/shared/router";
import { ROUTES } from "@/shared/router/index.type";
import { useAlertStore } from "@/shared/store/alert";
import { getItem } from "../utils/persistanceStorage";
import { validate } from "@/shared/lib/utils/rules";

// NOTE: local api address for development
const localApiAddress = getItem("dev:local-address");
let baseURL = import.meta.env.VITE_API_SERVER;
if (localApiAddress && validate.isValidHttpUrl(localApiAddress)) {
  baseURL = localApiAddress;
}

export const API = axios.create({
  baseURL,
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
      // @ts-ignore
      let showError = true;

      const alertStore = useAlertStore();

      switch (error?.response?.status) {
        case HTTP_CODES.BAD_REQUEST:
          showError = false;
          alertStore.showError(error.response.data.error.errorMessage);
          break;
        case HTTP_CODES.UNAUTHORIZED:
          showError = false;
          authStore.logout().then(() => {
            router.push(ROUTES.login);
          });
          break;
        case HTTP_CODES.FORBIDDEN:
          alert(t("lang-cd753f43-d3f9-44c8-8ad6-c383e6281497"));
          break;
        case HTTP_CODES.INTERNAL_SERVER_ERROR:
          alertStore.showError("Ошибка");
          break;
      }
      return Promise.reject(error);
    }
  }
);
