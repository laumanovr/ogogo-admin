import { API } from "@/shared/lib/plugins/axios";
import {
  AuthGetProfileResultInterface,
} from "@/shared/api/auth/types";

// export const login = (
//   credentials: AuthLoginPayloadInterface
// ): Promise<AuthLoginResultInterface> => {
//   const formData = new FormData();
//   Object.keys(credentials).forEach((key) => {
//     formData.append(key, credentials[key]);
//   });
//   return axios({
//     method: "POST",
//     url: "/api/auth/login",
//     data: formData,
//     headers: {
//       "content-type": "multipart/form-data",
//     },
//   }).then((response) => response.data.result);
// };

export const getGeneralParameters =
  (): Promise<AuthGetProfileResultInterface> => {
    return API({
      method: "GET",
      url: `/api/Common/GetGeneralParameters`,
    }).then((response) => response.data.result);
  };
