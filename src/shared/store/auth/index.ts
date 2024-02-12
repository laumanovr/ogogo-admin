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
// import { login as loginApi } from "@/api/auth/index";

// import type {
//   AuthState,
//   ILogin,
//   ILoginResultFail,
//   ILoginResultSuccess,
// } from "@/api/types/auth/index.types";
// import { ITheme, type IIndexable } from "@/utils/interfaces";
// import {
//   LanguageEnum,
//   type ILanguage,
// } from "@/api/types/reference/language.types";
// import i18n, { type Locales } from "@/plugins/i18n";
// // import { useAlertStore } from "@/stores/alert";
// import { FIDO2Auth } from "@/utils/auth/FIDO2Auth";
// import { getAvailableLanguages } from "@/api/reference/language";

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => {
    return {
      user: null,
      // loading: false,
      // loggedIn: false,
      // theme: ITheme.light,
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
    // getLanguage(): LanguageEnum | null {
    //   if (!this.user) return LanguageEnum.Russian;

    //   return (
    //     (this.user.language?.toLowerCase() as LanguageEnum) ??
    //     LanguageEnum.Russian
    //   );
    // },
    getFullName(): string {
      return this.user?.fullName ?? "";
    },
    getAuthToken(): string {
      return this.user?.token ?? null;
    },
    // getTheme(): ITheme {
    //   return this.theme;
    // },
    getLoading(): boolean {
      return this.isLoading;
    },
    // getAccessRequestIds(): IIndexable {
    //   return this.accessRequestIds;
    // },
    getUserLogin(): string {
      return this.user?.login ?? "";
    },
    getRoleId(): string {
      return this.user.roleId;
    },
    getRoleName(): string {
      return this.user.roleName;
    },
    // getAvailableLanguages(): ILanguage[] {
    //   return this.availableLanguages;
    // },
  },
  actions: {
    login(payload: ILogin): Promise<ILoginResultSuccess | ILoginResultFail> {
      // clear alerts for request
      const alertStore = useAlertStore();
      alertStore.clearAlerts();

      return new Promise((resolve, reject) => {
        login(payload)
          .then((result) => {
            // this.fidoAuth = data.fidoAuth;

            const needChangePassword = result?.needChangePassword ?? false;
            setItem("needChangePassword", needChangePassword);
            this.needChangePassword = needChangePassword as boolean;

            const oldSessionId = getItem("sessionId");

            setItem("sessionId", result?.sessionId);
            this.getCurrentUser()
              .then((path) => {
                // commit(mutationTypes.loginSuccess);

                // redirect based on breakpoint for mobile
                // let path =
                //   this.getters[getterTypes.getCurrentMenu][0]?.link ?? null;
                // if (isMobile) {
                //   path =
                //     this.getters[getterTypes.getCurrentMenu].find(
                //       (e) => e.navKey === "request-list"
                //     )?.link ?? path;
                // }

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

                // if (!path) {
                //   // reset session
                //   dispatch(actionTypes.resetSession);
                //   throw new Error("HasNotAvailableScreen");
                // }

                setItem("active-session", true);
                resolve();
              })
              .catch(reject);
          })
          // .then(async (data) => {
          //   if (this.fidoAuth) {
          //     // const { t } = i18n.global;
          //     // const fido = await FIDO2Auth(payload);
          //     // if (fido) {
          //     //   this.loading = true;
          //     //   this.user = { ...data, token: fido.token };
          //     //   return { ...data, token: fido.token };
          //     // } else {
          //     //   throw new Error(t("lang-1debbff9-16c4-42ec-a6fe-883a27bab62e"));
          //     // }
          //   } else {
          //     this.user = data;
          //     return data;
          //   }
          // })
          .then((data) => {
            // i18n.global.locale =
            //   (this.user.language?.toLowerCase() as Locales) ??
            //   LanguageEnum.Russian;
            // this.loggedIn = true;
            // this.accessRequestIds = {};
            // data.accessRequestIds.forEach((id) => {
            //   this.accessRequestIds[id] = true;
            // });
            // resolve(data);
          })
          .catch((err) => {
            this.user = null;
            this.isLoggedIn = false;

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
            // commit(mutationTypes.getCurrentUserSuccess, user)
            // i18n.locale = Languages.getLanguage(user.interfaceLanguage);

            const lastUserId = getItem("last-user-id");
            setItem("last-user-id", this.currentUser.id);
            if (
              lastUserId === undefined ||
              lastUserId === "" ||
              (lastUserId && lastUserId !== this.currentUser.id)
            ) {
              // commit(applicationMutationTypes.clearApplicationStateFilter);
              // commit(dashboardMutationTypes.resetApps);
            }
            // if (user.useSip) {
            //   dispatch(actionTypes.fetchSipAccount)
            //     .then(() => {
            //       dispatch(callActionTypes.initUserAgent);
            //       return true;
            //     })
            //     .finally(() => resolve(user));
            // } else {
            //   commit(mutationTypes.setSipAccount, null);
            //   return resolve(user);
            // }
          })
          .catch((error) => {
            // commit(mutationTypes.getCurrentUserFailure);
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
    // fetchAvailableLanguages() {
    //   return new Promise((resolve, reject) => {
    //     getAvailableLanguages()
    //       .then((data) => {
    //         this.availableLanguages = data;
    //         resolve(data);
    //       })
    //       .catch((err) => {
    //         reject(err);
    //       });
    //   });
    // },
  },
  persist: true,
});
