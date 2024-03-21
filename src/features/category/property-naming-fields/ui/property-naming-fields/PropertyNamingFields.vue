<template>
  <div class="name-fields-container mb-40">
    <p class="font-bold mb-24">
      {{ $t("lang-4572af8e-fb1f-4f76-a997-de5bc6aa89fb") }}
    </p>
    <div class="inputs-container">
      <SInput
        :label="$t('lang-bfee2c24-b7a6-41e9-8f4c-2620064b8a91')"
        :width="'100%'"
        class="name-field mb-16"
        :value="categorySharedStore.getRu"
        @update:model-value="onChange($event, 'ru')"
      />
      <SInput
        :label="$t('lang-cd2180a0-855c-4f07-8f94-0a0a14c4eaf0')"
        :width="'100%'"
        class="name-field mb-16"
        :modelValue="categorySharedStore.getKy"
        @update:model-value="onChange($event, 'ky')"
      />
      <SInput
        :label="$t('lang-d4de3868-af08-41e4-8807-11676c8fdf5d')"
        :width="'100%'"
        class="name-field mb-16"
        :modelValue="categorySharedStore.getEn"
        @update:model-value="onChange($event, 'en')"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { SInput } from "@tumarsoft/ogogo-ui";
import { useCategorySharedStore } from "@/shared/store/category";

const categorySharedStore = useCategorySharedStore();

const onChange = (value: string, key: string) => {
  categorySharedStore.setTranslation(value, key);
};
</script>
<style scoped lang="scss">
@import "styles";
</style>
