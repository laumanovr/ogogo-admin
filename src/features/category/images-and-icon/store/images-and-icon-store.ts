import { useCategorySharedStore } from "@/shared/store/category";
import { defineStore } from "pinia";
// import { useSaveCategorySettingsStore } from "../../save-category-settings/store/save-category-settings-store";
import { ImagesAndIconApi } from "../api/images-and-icon.api";
import { container } from "tsyringe";

const imageAndIconApiService = container.resolve(ImagesAndIconApi);

export const useImagesAndIconStore = defineStore("images-and-icon-store", {
  state: (): ISaveCategorySettingsState => {
    return {
      imgUrl: null,
      file: null,
    };
  },
  getters: {
    getAreas(): string | ArrayBuffer {
      return this.imgUrl;
    },
  },
  actions: {
    // setImgUrl(value: string) {
    //   const saveCategorySettingsStore = useSaveCategorySettingsStore();

    //   saveCategorySettingsStore.setImgUrl(value);
    // },

    setFile(file: File) {
      this.file = file;
    },
    saveUploadImage(file: FormData) {
      const categorySharedStore = useCategorySharedStore();

      imageAndIconApiService
        .uploadImage(file)
        .then((res) => {
          categorySharedStore.setImageId(res.fileId);
        })
        .catch(() => {})
        .finally(() => {});
    },
  },
});
