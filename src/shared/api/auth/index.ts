import { API } from "@/shared/lib/plugins/axios";
import {
  AuthGetProfileResultInterface,
  AuthLoginPayloadInterface,
  AuthLoginResultInterface,
} from "@/shared/api/auth/types";

export class AuthApi {
  login = (
    credentials: AuthLoginPayloadInterface
  ): Promise<AuthLoginResultInterface> => {
    return API({
      method: "POST",
      url: "Clients/Login",
      data: credentials,
    }).then((response) => response.data.result);
  };

  getCurrentUser = (): Promise<AuthGetProfileResultInterface> => {
    return API({
      method: "GET",
      url: `auth/getProfile`,
    }).then((response) => response.data.result);
  };

  logout = (): Promise<boolean> => {
    return API({
      method: "POST",
      url: "auth/logout",
    }).then((response) => response.data.ok);
  };

  updatePassword = (payload: { newPassword?: string }): Promise<boolean> => {
    return API.post("Auth/UpdateUserPassword", payload).then(
      (res) => res.data.ok
    );
  };

  forgotPassword = (payload?: { login: string }): Promise<boolean> => {
    return API.post("Auth/ForgotPassword", payload).then((res) => res.data.ok);
  };

  getSipAccount = (): Promise<{ login: string; password: string }> =>
    API.get("Auth/GetSipAccount").then((res) => res.data.result);
}
