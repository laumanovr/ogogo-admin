<template>
  <div class="main-wrapper-save-category">
    <SButton color="violet" class="save-button" @click="onSaveSettings">{{
      $t("lang-b819743e-e6d9-4b27-9dd0-4604271a2395")
    }}</SButton>
  </div>
</template>

<script lang="ts" setup>
import { SButton } from "@tumarsoft/ogogo-ui";

const emit = defineEmits(["saveSettings"]);

const onSaveSettings = () => {
  emit("saveSettings", true);
};
</script>

<style scoped lang="scss">
.main-wrapper-save-category {
  width: 213px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.preview {
  width: 213px;
  height: 213px;
  border-radius: 16px;
  padding: 12px 16px;
  background-color: #0000000a;
}
.save-button {
  width: 100%;
}
.preview-selected-image {
  overflow: hidden; /* Clip content that exceeds div bounds */
  position: relative;
  border-radius: 16px;
  .image-under-container {
    position: absolute; /* Position image absolutely within the div */
    top: 0; /* Align to the top of the div */
    left: 0; /* Align to the left of the div */
    width: 100%; /* Ensure image fills the div horizontally */
    height: 100%; /* Ensure image fills the div vertically */
    object-fit: cover;
  }
}
</style>
