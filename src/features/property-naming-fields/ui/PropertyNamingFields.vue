<template>
  <div class="name-fields-container mb-40">
    <p class="font-bold mb-24">
      {{ $t("lang-4572af8e-fb1f-4f76-a997-de5bc6aa89fb") }}
    </p>
    <div class="inputs-container">
      <SInput
        :label="$t('lang-bfee2c24-b7a6-41e9-8f4c-2620064b8a91')"
        class="name-field mb-16"
      />
      <SInput
        :label="$t('lang-cd2180a0-855c-4f07-8f94-0a0a14c4eaf0')"
        class="name-field mb-16"
      />
      <SInput
        :label="$t('lang-d4de3868-af08-41e4-8807-11676c8fdf5d')"
        class="name-field mb-16"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { SInput } from "@tumarsoft/ogogo-ui";
</script>
<style scoped lang="scss">
.name-fields-container {
  width: 100%;
  .inputs-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    .name-field {
      width: 100%;
    }
  }
}
</style>
