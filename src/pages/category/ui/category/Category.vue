<template>
  <div class="category-main-wrapper mt-16">
    <div class="left-side-bar-container">
      <CategoryTree />
    </div>
    <CategorySettings />
  </div>
</template>

<script lang="ts" setup>
import { CategoryTree } from "@/widgets/category-tree";
import { CategorySettings } from "@/widgets/category-settings";

// categories.value.push({
//   title: "lang-b14d63cd-580a-4645-8c82-860175a3830f",
//   childMarketplaceCategoryIdList: [],
// });
</script>

<style scoped lang="scss">
@import "styles";
</style>
