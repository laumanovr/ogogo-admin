import axios from "axios";
import { defineStore } from "pinia";
import {
  AuthGetProfileResultInterface,
  AuthState,
  ILogin,
  ILoginResultFail,
  ILoginResultSuccess,
} from "./index.types";
import { useAlertStore } from "@/shared/store/alert";
import { getCurrentUser, login } from "@/shared/api/auth";
import { getItem, setItem } from "@/shared/lib/utils/persistanceStorage";
import {
  AuthorizationChannelEvent,
  BroadcastChannelName,
} from "@/shared/lib/utils/consts";

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => {
    return {
      user: null,
      accessRequestIds: {},
      fidoAuth: false,
      availableLanguages: null,
      currentUser: null,
      isLoading: false,
      isLoggedIn: false,
      needChangePassword: false,
      roleScreensObj: {},
      sipAccount: {
        login: null,
        password: null,
      },
    };
  },
  getters: {
    isLoggedIn(): boolean {
      return this.isLoggedIn;
    },
    getFullName(): string {
      return this.user?.fullName ?? "";
    },
    getAuthToken(): string {
      return this.user?.token ?? null;
    },
    getLoading(): boolean {
      return this.isLoading;
    },
    getUserLogin(): string {
      return this.user?.login ?? "";
    },
    getRoleId(): string {
      return this.user.roleId;
    },
    getRoleName(): string {
      return this.user.roleName;
    },
  },
  actions: {
    login(payload: ILogin): Promise<ILoginResultSuccess | ILoginResultFail> {
      return new Promise((resolve, reject) => {
        login(payload)
          .then((result) => {

            const needChangePassword = result?.needChangePassword ?? false;
            setItem("needChangePassword", needChangePassword);
            this.needChangePassword = needChangePassword as boolean;

            const oldSessionId = getItem("sessionId");

            setItem("sessionId", result?.sessionId);
            return this.getCurrentUser()
              .then((user) => {
                // send event of updating profile and redirecting to route path to other tabs
                if (BroadcastChannel) {
                  const tabId = sessionStorage.getItem("tabId");

                  const bc = new BroadcastChannel(
                    BroadcastChannelName.AuthorizationChannel
                  );
                  if (oldSessionId && oldSessionId !== result?.sessionId) {
                    bc.postMessage({
                      event: AuthorizationChannelEvent.LoggingIn,
                      tabId,
                    });
                  }
                }

                setItem("active-session", true);
                resolve(user)
              }).catch(reject);
          }).catch((err) => {
            if (axios.isAxiosError(err)) {
              reject(err?.response?.data);
            } else {
              reject(err);
            }
          })
          .finally(() => {
            this.isLoading = false;
          });
      });
    },
    getCurrentUser(): Promise<AuthGetProfileResultInterface> {
      return new Promise<AuthGetProfileResultInterface>((resolve, reject) => {
        getCurrentUser()
          .then((user) => {
            // const lastUserId = getItem("last-user-id");
            // setItem("last-user-id", this.currentUser.id);
            // if (
            //   lastUserId === undefined ||
            //   lastUserId === "" ||
            //   (lastUserId && lastUserId !== this.currentUser.id)
            // ) {
            // }
            resolve(user)
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    logout(): Promise<boolean> {
      this.user = null;
      this.isLoggedIn = false;
      this.accessRequestIds = {};

      const alertStore = useAlertStore();
      alertStore.clearAlerts();

      return Promise.resolve(true);
    },
    setLang(payload: string) {
      this.user.language = payload;
    },
  },
  persist: true,
});
