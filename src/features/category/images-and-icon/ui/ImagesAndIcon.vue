<template>
  <p class="font-bold mb-10">
    {{ $t("lang-a4cb8b72-591b-4353-a8ac-0a910b6ea90d") }}
  </p>
  <div class="info-text-container mb-24">
    <SIconRender
      name="WarningIcon"
      color="violet-700"
      @click="onOpenImageRecomendationModal"
    />
    <p>{{ $t("lang-1c3dce6e-86b9-4523-a934-b391ddce337b") }}</p>
  </div>

  <div class="add-image-buttons-container mb-40">
    <label v-if="!imageUrl" for="big-image" class="add-image-big-button">
      <input
        id="big-image"
        class="file-upload-input"
        type="file"
        @change="handleImageUpload"
      />
      <img src="../../../../shared/ui/assets/plus-icon.png" />
    </label>
    <div v-if="imageUrl" class="preview-selected-big-image">
      <img :src="imageUrl" alt="Preview" class="big-image-under-container" />
      <SIconRender
        @click="closeImage"
        name="CloseIcon"
        color="violet"
        class="remove-icon"
      />
    </div>
    <label v-if="!iconUrl" for="small-image" class="add-image-small-button">
      <input
        id="small-image"
        class="file-upload-input"
        type="file"
        @change="handleIconUpload"
      />
      <img src="../../../../shared/ui/assets/plus-icon.png" />
    </label>
    <div v-if="iconUrl" class="preview-selected-small-image">
      <img :src="iconUrl" alt="Preview" class="small-image-under-container" />
      <SIconRender
        @click="closeIcon"
        name="CloseIcon"
        color="violet"
        class="remove-icon"
      />
    </div>
    <ImageRecomendationModal
      :value="imageRecomendationModalValue"
      @close="onClose"
    />
  </div>
</template>

<script lang="ts" setup>
import { SIconRender } from "@tumarsoft/ogogo-ui";
import { ref } from "vue";
import ImageRecomendationModal from "./ImageRecomendationModal.vue";
import { useImagesAndIconStore } from "../store/images-and-icon-store";
import { useSaveCategorySettingsStore } from "../../save-category-settings//store/save-category-settings-store";

let imageUrl = ref(null);
let iconUrl = ref(null);

const store = useImagesAndIconStore();
const saveCategorySettingsStore = useSaveCategorySettingsStore();

function handleImageUpload(event: any) {
  const file = event.target.files[0];
  if (!file) return;

  // Read the selected image file and generate a data URL

  // Resize or crop the image
  resizeImage(file);

  // const reader = new FileReader();
  // reader.onload = () => {
  //   imageUrl.value = reader.result;
  // };
  // reader.readAsDataURL(file);
}
function handleIconUpload(event: any) {
  const file = event.target.files[0];
  if (!file) return;

  // Read the selected image file and generate a data URL

  // Resize or crop the image
  resizeIcon(file);

  // const reader = new FileReader();
  // reader.onload = () => {
  //   imageUrl.value = reader.result;
  // };
  // reader.readAsDataURL(file);
}

function resizeImage(file: File) {
  saveCategorySettingsStore.setFile(file);
  const reader = new FileReader();
  reader.onload = (event) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Set canvas dimensions to desired size (e.g., 300x300)
      const maxWidth = 310;
      const maxHeight = 186;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      console.log(width);
      console.log(height);

      canvas.width = width;
      canvas.height = height;

      // Draw image onto canvas
      ctx.drawImage(img, 0, 0, width, height);

      // Convert canvas content to data URL
      const resizedImageUrl = canvas.toDataURL("image/jpeg");

      // Update imageUrl with resized image
      imageUrl.value = resizedImageUrl;
    };
    img.src = event.target.result as string;
    store.setImgUrl(event.target.result);
  };
  reader.readAsDataURL(file);
}

function resizeIcon(file: any) {
  const reader = new FileReader();
  reader.onload = (event) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Set canvas dimensions to desired size (e.g., 300x300)
      const maxWidth = 72;
      const maxHeight = 72;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      // Draw image onto canvas
      ctx.drawImage(img, 0, 0, width, height);

      // Convert canvas content to data URL
      const resizedImageUrl = canvas.toDataURL("image/jpeg");

      // Update imageUrl with resized image
      iconUrl.value = resizedImageUrl;
    };
    img.src = event.target.result as string;
  };
  reader.readAsDataURL(file);
}

const closeImage = () => {
  imageUrl.value = null;
  store.setImgUrl(null);
};
const closeIcon = () => {
  iconUrl.value = null;
};

let imageRecomendationModalValue = ref(false);

const onOpenImageRecomendationModal = () => {
  imageRecomendationModalValue.value = true;
};

const onClose = () => {
  imageRecomendationModalValue.value = false;
};
</script>

<style scoped lang="scss">
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

.add-image-big-button,
.add-image-small-button {
  position: relative;
  .file-upload-input {
    display: none;
    width: 100%;
    height: 100%;
    position: absolute;
    background: transparent;
  }
}
.add-image-small-button {
  width: 72px;
  height: 72px;
  border-radius: 8px;
}

.preview-selected-big-image {
  width: 310px;
  height: 186px;
  overflow: hidden; /* Clip content that exceeds div bounds */
  position: relative;
  background: #0000000a;
  border-radius: 16px;
  .big-image-under-container {
    position: absolute; /* Position image absolutely within the div */
    top: 0; /* Align to the top of the div */
    left: 0; /* Align to the left of the div */
    width: 100%; /* Ensure image fills the div horizontally */
    height: 100%; /* Ensure image fills the div vertically */
    object-fit: cover;
  }
}
.preview-selected-small-image {
  width: 72px;
  height: 72px;
  overflow: hidden; /* Clip content that exceeds div bounds */
  position: relative;
  background: #0000000a;
  border-radius: 16px;
  .small-image-under-container {
    position: absolute; /* Position image absolutely within the div */
    top: 0; /* Align to the top of the div */
    left: 0; /* Align to the left of the div */
    width: 100%; /* Ensure image fills the div horizontally */
    height: 100%; /* Ensure image fills the div vertically */
    object-fit: cover;
  }
}
.remove-icon {
  position: absolute;
  top: 15px;
  right: 15px;
}
</style>
../store/images-and-icon-store
../../save-category-settings/store/save-category-settings-store
