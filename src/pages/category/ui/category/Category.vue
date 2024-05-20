<template>
  <div class="category-main-wrapper mt-16">
    <div class="left-side-bar-container h-p-100">
      <CategoryTree />
    </div>
    <CategorySettings />
  </div>
</template>

<script lang="ts" setup>
// import LeftSideBar from "@/widgets/category/left-side-bar/ui/LeftSideBar.vue";
// import CategorySettings from "@/widgets/category/category-settings/ui/CategorySettings.vue";
import { CategoryTree } from "@/widgets/category-tree";
import { CategorySettings } from "@/widgets/category-settings";

// categories.value.push({
//   title: "lang-b14d63cd-580a-4645-8c82-860175a3830f",
//   childMarketplaceCategoryIdList: [],
// });
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
