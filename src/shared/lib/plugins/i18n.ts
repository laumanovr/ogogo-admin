import localeRu from "@/shared/lib/locales/ru.json";
import localeEn from "@/shared/lib/locales/en.json";
import { createI18n } from "vue-i18n";

export type Locales = "ru" | "en";

export default createI18n({
  locale: "ru",
  allowComposition: true,
  fallBackLocale: "ru",
  messages: {
    ru: localeRu,
    en: localeEn,
  },
});
