<template>
  <p class="font-bold">
    {{ $t("lang-13910017-20f7-43fd-a9a8-7dbcd2b474f0") }}
  </p>
  <p class="text">
    {{ $t("lang-e0326aaa-d508-49a7-b6f8-389a6a0d922b") }}
  </p>
  <Button color="gray" class="add-button">
    <img src="../../../shared/ui/assets/plus-icon.png" />
    <p>{{ $t("lang-af8b01aa-014b-421c-98fd-e68365f64cf4") }}</p></Button
  >
</template>

<script lang="ts" setup>
import Button from "../../../../node_modules/ogogo-uikit/src/components/SButton/SButton.vue";
</script>

<style scoped lang="scss">
.add-button {
  width: 100%;
  height: 52px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}
.text {
  color: #7c3aed;
}
</style>
