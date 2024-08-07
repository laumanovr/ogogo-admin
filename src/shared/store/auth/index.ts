import { defineStore } from "pinia";
import {
  AuthGetProfileResultInterface,
  AuthState,
  ILogin,
} from "./index.types";
import { container } from "tsyringe";
import { AuthApi } from "@/shared/api/auth/index.ts";
import { isAxiosError } from "axios";

const authApiService = container.resolve(AuthApi);

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => {
    return {
      currentUser: null,
      needChangePassword: false,
      sessionId: null,
    };
  },
  getters: {
    getSessionId(): string {
      return this.sessionId;
    },
    getUserProfile(): AuthGetProfileResultInterface {
      return this.currentUser;
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
          });
      });
    },
    getCurrentUser(): Promise<AuthGetProfileResultInterface> {
      return new Promise<AuthGetProfileResultInterface>((resolve, reject) => {
        authApiService
          .getCurrentUser()
          .then((userProfile) => {
            this.currentUser = userProfile;
            resolve(userProfile);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    logout(): Promise<boolean> {
      this.currentUser = null;
      this.sessionId = "";
      return Promise.resolve(true);
    },
  },
  persist: {
    storage: localStorage,
  },
});
