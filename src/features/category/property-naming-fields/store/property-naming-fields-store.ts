import { defineStore } from "pinia";
import { IPropertyNamingFields } from "./property-naming-fields-store.types";

export const usePropertyNamingFieldsStore = defineStore(
  "property-naming-fields",
  {
    state: (): IPropertyNamingFields => {
      return {
        ru: null,
        en: null,
        ky: null,
      };
    },
    getters: {
      getRu(): string {
        return this.ru;
      },
      getEn(): string {
        return this.en;
      },
      getKy(): string {
        return this.ky;
      },
    },
    actions: {
      setTranslation(value: string, key: string) {
        if (key === "ru") {
          this.ru = value;
        } else if (key === "ky") {
          this.ky = value;
        } else if (key === "en") {
          this.en = value;
        }
      },
    },
  }
);
