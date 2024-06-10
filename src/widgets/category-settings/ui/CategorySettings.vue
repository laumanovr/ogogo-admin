<template>
  <SForm class="main-wrapper h-p-100" ref="namingFieldsForm">
    <div class="settings h-p-100 w-p-100">
      <ImagesAndIcon />
      <PropertyNamingFields />
      <AddProperty />
    </div>
  </SForm>
  <div class="save-block light">
    <SButton @click="onSaveSettings">
      {{ $t("lang-b819743e-e6d9-4b27-9dd0-4604271a2395") }}
    </SButton>
  </div>
</template>
<script lang="ts" setup>
import { ImagesAndIcon } from "@/features/category/images-and-icon";
import { PropertyNamingFields } from "@/features/category/property-naming-fields";
import { AddProperty } from "@/features/category/add-property";
// import { useCategoryStore } from "@/widgets/category/category-settings";
import { SButton, SForm } from "@tumarsoft/ogogo-ui";
import { ref } from "vue";
import { useCategoryStore } from "@/entities/category";

const categoryStore = useCategoryStore();

const onSaveSettings = () => {
  namingFieldsForm.value.validate().then((isValid: boolean) => {
    if (isValid) {
      categoryStore.saveCategorySettings();
    }
  });
};

const namingFieldsForm = ref(null);
</script>
<style scoped lang="scss">
@import "../../../app/styles/colors.scss";

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
.settings {
  overflow-y: scroll;
  height: 86vh;
}

.save-block {
  .button {
    width: 215px;
  }
}
</style>
