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
    <label
      v-if="!imageUrl && !file"
      for="big-image"
      class="add-image-big-button"
    >
      <input
        id="big-image"
        class="file-upload-input"
        type="file"
        @change="handleImageUpload"
      />
      <img src="/icons/plus-icon.png" />
    </label>
    <div v-if="imageUrl || file" class="preview-selected-big-image">
      <img :src="file" alt="Preview" class="big-image-under-container" />
      <SIconRender
        @click="closeImage"
        name="CloseIcon"
        color="violet"
        class="remove-icon"
      />
    </div>
    <label
      v-if="!iconUrl && !iconFetched"
      for="small-image"
      class="add-image-small-button"
    >
      <input
        id="small-image"
        class="file-upload-input"
        type="file"
        @change="handleIconUpload"
      />
      <img src="/icons/plus-icon.png" />
    </label>
    <div v-if="iconUrl || iconFetched" class="preview-selected-small-image">
      <img
        :src="iconUrl || iconFetched"
        alt="Preview"
        class="small-image-under-container"
      />
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
import { ref, computed } from "vue";
import {
  ImageRecomendationModal,
  useImagesAndIconStore,
} from "@/features/category/images-and-icon";
// import { useSaveCategorySettingsStore } from "@/features/category/save-category-settings";
import { useCategorySharedStore } from "@/shared/store/category";

let imageUrl = ref(null);
let iconUrl = ref(null);

const store = useImagesAndIconStore();
// const saveCategorySettingsStore = useSaveCategorySettingsStore();

const categorySharedStore = useCategorySharedStore();

const iconFetched = computed(() => {
  return categorySharedStore.getIcoBase64 as string;
});

const file = computed(() => {
  return categorySharedStore.getFile;
});

function handleImageUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files[0];
  if (!file) return;

  // Read the selected image file and generate a data URL

  // Resize or crop the image
  resizeImage(file);

  const formData = new FormData();
  formData.append("File", file);

  store.saveUploadImage(formData);
}
function handleIconUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files[0];
  if (!file) return;

  // Read the selected image file and generate a data URL

  // Resize or crop the image
  resizeIcon(file);

  const reader = new FileReader();

  let base64String;

  // Set up a callback function to run when the file has been read
  reader.onload = function (event) {
    // 'event.target.result' contains the Base64 encoded string
    base64String = event.target.result;
    console.log(base64String);
    categorySharedStore.setIcoBase64(base64String);
  };
}

function resizeImage(file: File) {
  // saveCategorySettingsStore.setFile(file);
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
    store.setImgUrl(event.target.result as string);
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
    categorySharedStore.setCategoryIcon(event.target.result as string);
  };
  reader.readAsDataURL(file);
}

const closeImage = () => {
  imageUrl.value = null;
  store.setImgUrl(null);
};
const closeIcon = () => {
  iconUrl.value = null;
  categorySharedStore.setCategoryIcon(null);
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
@import "styles";
</style>
