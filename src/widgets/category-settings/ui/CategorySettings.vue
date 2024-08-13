<template>
  <SForm class="main-wrapper s-h-full" ref="namingFieldsForm">
    <SLoader v-if="isLoading" />
    <div class="settings s-h-full s-w-full">
      <ImagesAndIcon />
      <PropertyNamingFields />
      <AddProperty />
    </div>
  </SForm>
  <div class="save-block">
    <SButton @click="onSaveSettings">
      {{ $t("lang-b819743e-e6d9-4b27-9dd0-4604271a2395") }}
    </SButton>
  </div>
</template>
<script lang="ts" setup>
import { ImagesAndIcon } from "@/features/category/images-and-icon";
import { PropertyNamingFields } from "@/features/category/property-naming-fields";
import { AddProperty } from "@/features/category/add-property";
import { SButton, SForm, SLoader } from "@tumarsoft/ogogo-ui";
import { ref } from "vue";
import { useCategoryStore } from "@/entities/category";
import { useAlertStore } from "@/shared/store/alert";

const categoryStore = useCategoryStore();
const alertStore = useAlertStore();
const namingFieldsForm = ref(null);
const isLoading = ref(false);

const onSaveSettings = () => {
  namingFieldsForm.value.validate().then((isValid: boolean) => {
    if (isValid) {
      isLoading.value = true;
      categoryStore
        .saveCategorySettings()
        .then((message: string) => {
          alertStore.showSuccess(message);
        })
        .finally(() => {
          isLoading.value = false;
        });
    }
  });
};
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
  color: $violet-700;
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
  background-color: $black;
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

.save-block {
  .button {
    width: 215px;
    position: sticky;
    top: 10px;
  }
}
</style>
