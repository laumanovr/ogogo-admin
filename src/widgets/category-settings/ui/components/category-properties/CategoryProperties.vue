<template>
  <p class="s-text-title-2 s-mb-3">
    {{ $t("lang-13910017-20f7-43fd-a9a8-7dbcd2b474f0") }}
  </p>
  <p class="text s-mb-6">
    {{ $t("lang-e0326aaa-d508-49a7-b6f8-389a6a0d922b") }}
  </p>
  <AddProperty />
</template>

<script lang="ts" setup>
import { AddProperty } from "@/features/category/add-property";
</script>

<style scoped lang="scss">
@import "styles";
</style>
