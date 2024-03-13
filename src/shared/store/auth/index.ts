import { defineStore } from "pinia";
import {
  AuthGetProfileResultInterface,
  AuthState,
  ILogin,
} from "./index.types";
import { useAlertStore } from "@/shared/store/alert";
import { container } from "tsyringe";
import {
  AuthorizationChannelEvent,
  BroadcastChannelName,
} from "@/shared/lib/utils/consts";
import { AuthApi } from "@/shared/api/auth/index.ts";
import { isAxiosError } from "axios";

const authApiService = container.resolve(AuthApi);

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => {
    return {
      user: null,
      accessRequestIds: {},
      fidoAuth: false,
      availableLanguages: null,
      currentUser: null,
      isLoading: false,
      needChangePassword: false,
      roleScreensObj: {},
      sipAccount: {
        login: null,
        password: null,
      },
      sessionId: null,
      isActiveSession: false,
      tabId: null,
    };
  },
  getters: {
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
    getSessionId(): string {
      return this.sessionId;
    },
    getIsActiveSession(): boolean {
      return this.isActiveSession;
    },
    getTabId(): string {
      return this.tabId;
    },
  },
  actions: {
    login(payload: ILogin): Promise<any> {
      return new Promise((resolve, reject) => {
        authApiService
          .login(payload)
          .then((result) => {
            const needChangePassword = result?.needChangePassword ?? false;
            this.needChangePassword = needChangePassword as boolean;

            const oldSessionId = this.sessionId;

            this.sessionId = result?.sessionId;
            return this.getCurrentUser()
              .then((user) => {
                // send event of updating profile and redirecting to route path to other tabs
                if (BroadcastChannel) {
                  const tabId = this.tabId;

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

                this.isActiveSession = true;
                resolve(user);
              })
              .catch(reject);
          })
          .catch((err) => {
            if (isAxiosError(err)) {
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
        authApiService
          .getCurrentUser()
          .then((user) => {
            // const lastUserId = getItem("last-user-id");
            // setItem("last-user-id", this.currentUser.id);
            // if (
            //   lastUserId === undefined ||
            //   lastUserId === "" ||
            //   (lastUserId && lastUserId !== this.currentUser.id)
            // ) {
            // }
            resolve(user);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    logout(): Promise<boolean> {
      return new Promise((resolve, reject) => {
        authApiService
          .logout()
          .then((res) => {
            this.user = null;
            this.accessRequestIds = {};

            this.sessionId = null;
            this.isActiveSession = false;

            const alertStore = useAlertStore();
            alertStore.clearAlerts();

            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    setLang(payload: string) {
      this.user.language = payload;
    },
  },
  persist: true,
});
