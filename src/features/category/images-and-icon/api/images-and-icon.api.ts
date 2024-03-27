import { API } from "@/shared/lib/plugins/axios";
import { singleton } from "tsyringe";
import { UploadFile } from "./images-and-icon.api.types";

@singleton()
export class ImagesAndIconApi {
  uploadImage = (payload: FormData): Promise<UploadFile> =>
    API.post(`File/UploadFile`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((res) => res.data.result);
}
