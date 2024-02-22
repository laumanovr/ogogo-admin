import { defineStore } from "pinia";

export const useSaveCategorySettingsStore = defineStore(
  "save-category-settings-store",
  {
    state: (): ISaveCategorySettingsState => {
      return {
        imgUrl: null,
        file: null,
      };
    },
    getters: {
      getImgUrl(): string {
        return this.imgUrl;
      },
      getFile(): File {
        return this.file;
      },
    },
    actions: {
      setImgUrl(value: string) {
        this.imgUrl = value;
      },
      setFile(file: File) {
        this.file = file;
      },
    },
  }
);
