<template>
  <div class="category-main-wrapper">
    <div class="left-side-bar-container">
      <LeftSideBar />
    </div>
    <CategorySettings />
  </div>
</template>

<script lang="ts" setup>
import LeftSideBar from "@/widgets/category/left-side-bar/ui/LeftSideBar.vue";
import CategorySettings from "@/widgets/category/category-settings/ui/CategorySettings.vue";
</script>

<style scoped>
.category-main-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 48px;
}
.left-side-bar-container {
}
</style>
