<template>
  <div class="main-wrapper">
    <div class="settings">
      <ImagesAndIcon />
      <PropertyNamingFields />
      <CategoryProperties />
      <PropertyCardList />
    </div>
  </div>
  <!-- <div class="save-block">
    <SaveCategorySettings @saveSettings="onSaveSettings" />
  </div> -->
</template>
<script lang="ts" setup>
import { ImagesAndIcon } from "@/features/category/images-and-icon";
import { PropertyNamingFields } from "@/features/category/property-naming-fields";
import { CategoryProperties, PropertyCardList } from "./components";
// import { SaveCategorySettings } from "@/features/category/save-category-settings";
import { useCategoryStore } from "@/entities/category";

const categoryStore = useCategoryStore();

const onSaveSettings = () => {
  categoryStore.saveCategorySettings();
};
</script>
<style scoped lang="scss">
@import "style.scss";
</style>
