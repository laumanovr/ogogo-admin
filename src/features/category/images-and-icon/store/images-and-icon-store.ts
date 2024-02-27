import { defineStore } from "pinia";
import { useSaveCategorySettingsStore } from "../../save-category-settings/store/save-category-settings-store";

export const useImagesAndIconStore = defineStore("images-and-icon-store", {
  state: (): ISaveCategorySettingsState => {
    return {
      imgUrl: null,
      file: null,
    };
  },
  getters: {
    getAreas(): string {
      return this.imgUrl;
    },
  },
  actions: {
    setImgUrl(value: string) {
      const saveCategorySettingsStore = useSaveCategorySettingsStore();

      saveCategorySettingsStore.setImgUrl(value);
    },
    setFile(file: File) {
      this.file = file;
    },
  },
});
