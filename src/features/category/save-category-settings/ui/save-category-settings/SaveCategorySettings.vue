<template>
  <div class="main-wrapper-save-category">
    <SButton color="violet" class="save-button" @click="onSaveSettings">{{
      $t("lang-b819743e-e6d9-4b27-9dd0-4604271a2395")
    }}</SButton>
  </div>
</template>

<script lang="ts" setup>
import { SButton } from "@tumarsoft/ogogo-ui";

const emit = defineEmits(["saveSettings"]);

const onSaveSettings = () => {
  emit("saveSettings", true);
};
</script>

<style scoped lang="scss">
@import "styles";
</style>
