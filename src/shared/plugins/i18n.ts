import localeRu from "@/shared/locales/ru.json";
import localeEn from "@/shared/locales/en.json";
import { createI18n } from "vue-i18n";

export type Locales = "ru" | "en";

export const i18n = createI18n({
  locale: "ru",
  allowComposition: true,
  fallBackLocale: "ru",
  messages: {
    ru: localeRu,
    en: localeEn,
  },
});
