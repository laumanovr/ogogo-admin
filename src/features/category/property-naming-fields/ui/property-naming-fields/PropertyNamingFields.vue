<template>
  <div class="s-w-full s-mb-8">
    <p class="s-text-title-2 s-mb-5">
      {{ $t("lang-4572af8e-fb1f-4f76-a997-de5bc6aa89fb") }}
    </p>
    <div class="inputs-container">
      <SInput
        :label="$t('lang-bfee2c24-b7a6-41e9-8f4c-2620064b8a91')"
        class="s-mb-4"
        :rules="[requiredField]"
        :modelValue="categoryStore.getRu ?? ''"
        @update:modelValue="onChange($event, 'ru')"
      />
      <SInput
        :label="$t('lang-cd2180a0-855c-4f07-8f94-0a0a14c4eaf0')"
        class="s-mb-4"
        :modelValue="categoryStore.getKy"
        @update:modelValue="onChange($event, 'ky')"
      />
      <SInput
        :label="$t('lang-d4de3868-af08-41e4-8807-11676c8fdf5d')"
        class="s-mb-4"
        :modelValue="categoryStore.getEn"
        @update:modelValue="onChange($event, 'en')"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { SInput } from "@tumarsoft/ogogo-ui";
import { requiredField } from "@/shared/lib/utils/rules";
import { useCategoryStore } from "@/entities/category";

const categoryStore = useCategoryStore();

const onChange = (value: string, key: string) => {
  categoryStore.setTranslation(value, key);
};
</script>
<style scoped lang="scss">
@import "styles";
</style>
