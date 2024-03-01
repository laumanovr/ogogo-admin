import { useI18n } from "vue-i18n";
import axios from "axios";

import { getItem } from "../utils/persistanceStorage";
import { INTERCEPTOR_EXCLUDE_LIST_ERROR_CODES } from "@/app/router/index.type";
import { useAuthStore } from "@/shared/store/auth";

import router from "@/app/router/";

axios.defaults.baseURL = import.meta.env.VITE_API_SERVER;

function runWhen(error) {
  const errorCode = error?.response?.data?.error?.errorCode;
  if (errorCode && INTERCEPTOR_EXCLUDE_LIST_ERROR_CODES.includes(errorCode))
    return false;
  return true;
}

export default function setup() {
  axios.interceptors.request.use(
    function (config) {
      const isActiveSession = getItem("active-session");
      if (
        (config.url === "/api/common/Ping" && isActiveSession) ||
        config.url !== "/api/common/Ping"
      ) {
        const token = getItem("sessionId");
        config.headers.Authorization = token ? `Bearer ${token}` : "";
      }

      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      if (!runWhen(error)) return Promise.reject(error);

      const errorCode = error?.response?.data?.error?.errorCode;

      // const customMessage = getCustomErrorMessage(errorCode);
      const certificatePing = error?.response?.request?.responseURL?.includes(
        "certificate-ping.txt"
      );
      // if (customMessage) {
      //   store.dispatch(
      //     notificationActionTypes.addErrorNotification,
      //     customMessage
      //   );
      //   return Promise.reject(error);
      // } else

      if (certificatePing) {
        // store.dispatch(
        //   notificationActionTypes.addErrorNotification,
        //   i18n.t("validations.noConnectionCerficatePing")
        // );
        return Promise.reject(error);
      } else {
        let showError = true;
        const authStore = useAuthStore();

        switch (error?.response?.status) {
          case 401:
            showError = false;

            router.push("/");
            break;
          case 403:
            showError = false;
            await authStore.logout;
            router.push("/");
            break;
          case 500:
            const { t } = useI18n();

            alert(t("label-5a8130e9-116a-4c54-8be2-166380fae5d1"));
            break;
        }
        if (showError) {
          // store.dispatch(notificationActionTypes.addErrorNotification, error);
        }
        return Promise.reject(error);
      }
    }
  );
}
