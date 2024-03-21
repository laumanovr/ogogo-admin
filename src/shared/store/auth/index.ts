import { defineStore } from "pinia";
import {
  AuthGetProfileResultInterface,
  AuthState,
  ILogin,
} from "./index.types";
import { useAlertStore } from "@/shared/store/alert";
import { container } from "tsyringe";
import { AuthApi } from "@/shared/api/auth/index.ts";
import { isAxiosError } from "axios";

const authApiService = container.resolve(AuthApi);

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => {
    return {
      user: null,
      userProfile: null,
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
    getTabId(): string {
      return this.tabId;
    },
    getUserProfile(): AuthGetProfileResultInterface {
      return this.userProfile;
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

            this.sessionId = result?.sessionId;
            return this.getCurrentUser()
              .then((user) => {
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
          .then((userProfile) => {
            this.userProfile = userProfile;
            resolve(userProfile);
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

            const alertStore = useAlertStore();
            alertStore.clearAlerts();

            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
  persist: true,
});
