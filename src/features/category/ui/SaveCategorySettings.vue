<template>
  <div class="main-wrapper-save-category">
    <div class="preview mb-12">
      <p class="font-bold">
        {{ $t("lang-4e447adf-5042-41dd-bea9-ea3cecf11f3d") }}
      </p>
      <div class="w-p100 h-p100 d-flex items-center justify-center">
        <img src="../../../shared/ui/assets/gallery-slash.png" />
      </div>
    </div>
    <p class="mb-28">{{ $t("lang-f311a0ea-a62e-4875-817c-a342d01d6181") }}</p>
    <SButton color="violet" class="save-button">{{
      $t("lang-b819743e-e6d9-4b27-9dd0-4604271a2395")
    }}</SButton>
  </div>
</template>

<script lang="ts" setup>
import { SButton } from "@tumarsoft/ogogo-ui";
</script>

<style scoped lang="scss">
.main-wrapper-save-category {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.preview {
  width: 213px;
  height: 213px;
  border-radius: 16px;
  padding: 12px 16px;
  background-color: #0000000a;
}
.save-button {
  width: 100%;
}
</style>
