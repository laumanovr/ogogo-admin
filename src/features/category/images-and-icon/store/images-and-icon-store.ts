import { defineStore } from "pinia";
import { ImagesAndIconApi } from "../api/images-and-icon.api";
import { container } from "tsyringe";
import { IImagesAndIconState } from "./images-and-icon-store.types";
import { useCategoryStore } from "@/entities/category";

const imageAndIconApiService = container.resolve(ImagesAndIconApi);

export const useImagesAndIconStore = defineStore("images-and-icon-store", {
  state: (): IImagesAndIconState => {
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
    setImgUrl(value: string) {
      this.imgUrl = value;
    },

    setFile(file: File) {
      this.file = file;
    },
    saveUploadImage(file: FormData) {
      const categorySharedStore = useCategoryStore();

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
