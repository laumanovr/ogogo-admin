<template>
  <div class="category-main-wrapper s-mt-4">
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
.category-main-wrapper {
  height: 86vh;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 48px;
}
</style>
