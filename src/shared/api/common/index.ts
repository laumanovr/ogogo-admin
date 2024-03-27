import { API } from "@/shared/lib/plugins/axios";
import { singleton } from "tsyringe";

@singleton()
export class CommonApi {
  getGeneralParameters = (): Promise<any> => {
    return API({
      method: "GET",
      url: `/api/Common/GetGeneralParameters`,
    }).then((response) => response.data.result);
  };
}
