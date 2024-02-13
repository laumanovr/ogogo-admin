<template>
  <div class="preview">
    <p class="font-bold">
      {{ $t("lang-4e447adf-5042-41dd-bea9-ea3cecf11f3d") }}
    </p>
  </div>
  <p>{{ $t("lang-f311a0ea-a62e-4875-817c-a342d01d6181") }}</p>
  <Button color="violet" class="save-button">{{
    $t("lang-b819743e-e6d9-4b27-9dd0-4604271a2395")
  }}</Button>
</template>

<script lang="ts" setup>
import Button from "../../../../node_modules/ogogo-uikit/src/components/SButton/SButton.vue";
</script>

<style scoped lang="scss">
.preview {
  width: 310px;
  height: 186px;
  border-radius: 16px;
  padding: 12px 16px;
  background-color: #0000000a;
}
.save-button {
  width: 100%;
}
</style>
