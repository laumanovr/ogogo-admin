<template>
  <div class="s-mt-4 s-h-full s-flex s-justify-start s-gap-12">
    <div class="left-side-bar-container s-h-full">
      <CategoryTree />
    </div>
    <CategorySettings />
  </div>
</template>

<script lang="ts" setup>
import { CategoryTree } from "@/widgets/category-tree";
import { CategorySettings } from "@/widgets/category-settings";
</script>

<style scoped lang="scss">
@import "../../../../app/styles/colors.scss";
</style>
