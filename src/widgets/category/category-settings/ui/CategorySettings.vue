<template>
  <div class="main-wrapper">
    <div class="settings">
      <ImagesAndIcon />
      <PropertyNamingFields />
      <AddProperty />
    </div>
  </div>
  <div class="save-block">
    <SaveCategorySettings @saveSettings="onSaveSettings" />
  </div>
</template>
<script lang="ts" setup>
import { ImagesAndIcon } from "@/features/category/images-and-icon";
import PropertyNamingFields from "@/features/category/property-naming-fields/ui/PropertyNamingFields.vue";
import AddProperty from "@/features/category/add-property/ui/AddProperty.vue";
import { SaveCategorySettings } from "@/features/category/save-category-settings";
import { useCategoryStore } from "@/widgets/category/category-settings";

const categoryStore = useCategoryStore();

const onSaveSettings = () => {
  categoryStore.saveCategorySettings();
};
</script>
<style scoped lang="scss">
.main-wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
}
.info-text-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #6d28d9;
  gap: 10px;
}

.add-image-buttons-container {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 40px;
}
.add-image-big-button,
.add-image-small-button {
  width: 310px;
  height: 186px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  background-color: #0000000a;
  cursor: pointer;
}
.add-image-small-button {
  width: 72px;
  height: 72px;
}
.name-fields-container {
  width: 100%;
  .inputs-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    .name-field {
      width: 100%;
    }
  }
}
</style>
@/widgets/category/category-settings/store/category-store
