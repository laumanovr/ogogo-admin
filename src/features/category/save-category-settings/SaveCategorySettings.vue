<template>
  <div class="main-wrapper-save-category">
    <div class="preview mb-12">
      <p class="font-bold">
        {{ $t("lang-4e447adf-5042-41dd-bea9-ea3cecf11f3d") }}
      </p>
      <div
        class="w-p100 h-p96 d-flex items-center justify-center preview-selected-image"
      >
        <img
          v-if="!getImgUrl"
          src="../../../shared/ui/assets/gallery-slash.png"
          class=""
        />
        <img v-if="getImgUrl" :src="getImgUrl" class="image-under-container" />
      </div>
    </div>
    <p class="mb-28">{{ $t("lang-f311a0ea-a62e-4875-817c-a342d01d6181") }}</p>
    <SButton color="violet" class="save-button">{{
      $t("lang-b819743e-e6d9-4b27-9dd0-4604271a2395")
    }}</SButton>
  </div>
</template>

<script lang="ts" setup>
import { computed, watch, ref } from "vue";
import { SButton } from "@tumarsoft/ogogo-ui";
import { useSaveCategorySettingsStore } from "./save-category-settings-store";

const store = useSaveCategorySettingsStore();

const getImgUrl = computed(() => store.getImgUrl);

// const localImgUrl = ref(null);

// watch(getImgUrl, (value) => {
//   const reader = new FileReader();
//   reader.onload = (event) => {
//     const img = new Image();
//     img.onload = () => {
//       const canvas = document.createElement("canvas");
//       const ctx = canvas.getContext("2d");

//       // Set canvas dimensions to desired size (e.g., 300x300)
//       const maxWidth = 178;
//       const maxHeight = 186;
//       let width = img.width;
//       let height = img.height;

//       if (width > height) {
//         if (width > maxWidth) {
//           height *= maxWidth / width;
//           width = maxWidth;
//         }
//       } else {
//         if (height > maxHeight) {
//           width *= maxHeight / height;
//           height = maxHeight;
//         }
//       }

//       console.log(width);
//       console.log(height);

//       canvas.width = width;
//       canvas.height = height;

//       // Draw image onto canvas
//       ctx.drawImage(img, 0, 0, width, height);

//       // Convert canvas content to data URL
//       const resizedImageUrl = canvas.toDataURL("image/jpeg");

//       // Update imageUrl with resized image
//       imageUrl.value = resizedImageUrl;
//     };
//     img.src = event.target.result as string;
//     localImgUrl.value = event.target.result;
//   };

//   store.getFile;

//   reader.readAsDataURL(store.getFile);
// });
</script>

<style scoped lang="scss">
.main-wrapper-save-category {
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
