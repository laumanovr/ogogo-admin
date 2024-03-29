import { API } from "@/shared/lib/plugins/axios";
import { singleton } from "tsyringe";

@singleton()
export class FileApi {
  getFileById = (id: string, sessionId: string): Promise<Blob | MediaSource> =>
    API.get(`File/FileById`, {
      params: { id, sessionId },
      responseType: "blob",
    }).then((res) => res.data);
}
