<template>
  <p class="s-text-title-2 s-mb-2">
    {{ $t("lang-a4cb8b72-591b-4353-a8ac-0a910b6ea90d") }}
  </p>
  <div class="info-text-container s-mb-5">
    <SIconRender
      name="alert-warning"
      class="s-text-violet-700"
      @click="onOpenImageRecomendationModal"
    />
    <p>{{ $t("lang-1c3dce6e-86b9-4523-a934-b391ddce337b") }}</p>
  </div>

  <div class="add-image-buttons-container s-mb-8">
    <SFileInput
      size="medium"
      mode="plus"
      @change="handleImageUpload"
      v-if="!imageUrl && !file"
    />
    <div
      v-if="imageUrl || file"
      class="preview-selected-big-image s-rounded-lg"
    >
      <img
        :src="imageUrl || file"
        alt="Preview"
        class="big-image-under-container"
      />
      <img
        src="@/shared/assets/close-rounded-icon.svg"
        @click="closeImage"
        class="remove-icon cursor-pointer"
      />
    </div>
    <SFileInput
      mode="plus"
      @change="handleIconUpload"
      v-if="!iconUrl && !iconFetched"
    />
    <div v-if="iconUrl || iconFetched" class="s-relative">
      <div class="preview-selected-small-image s-rounded-lg">
        <img
          :src="iconUrl || iconFetched"
          alt="Preview"
          class="small-image-under-container"
        />
        <img
          src="@/shared/assets/close-rounded-icon.svg"
          @click="closeIcon"
          class="remove-icon cursor-pointer"
        />
      </div>
    </div>
    <ImageRecomendationModal ref="imageInfoModal" />
  </div>
</template>

<script lang="ts" setup>
import { SIconRender, SFileInput } from "@tumarsoft/ogogo-ui";
import { ref, computed } from "vue";
import {
  ImageRecomendationModal,
  useImagesAndIconStore,
} from "@/features/category/images-and-icon";
import { useCategoryStore } from "@/entities/category";

let imageUrl = ref(null);
let iconUrl = ref(null);
const imageInfoModal = ref(null);
const store = useImagesAndIconStore();
const categoryStore = useCategoryStore();
const iconFetched = computed(() => {
  return categoryStore.getIcoBase64 as string;
});
const file = computed(() => {
  return categoryStore.getFile;
});

function handleImageUpload(file: File) {
  if (!file) return;
  resizeImage(file);
  const formData = new FormData();
  formData.append("File", file);
  store.saveUploadImage(formData);
}

function handleIconUpload(file: File) {
  if (!file) return;
  resizeIcon(file);
}

function resizeImage(file: File) {
  const reader = new FileReader();
  reader.onload = (event) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

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
    categoryStore.setCategoryIcon(event.target.result as string);
    categoryStore.setIcoBase64(event.target.result as string);
  };
  reader.readAsDataURL(file);
}

const closeImage = () => {
  imageUrl.value = null;
  store.setImgUrl(null);
  categoryStore.setFile(null);
};
const closeIcon = () => {
  iconUrl.value = null;
  categoryStore.setIcoBase64(null);
};

const onOpenImageRecomendationModal = () => {
  imageInfoModal.value.toggle();
};
</script>

<style scoped lang="scss">
@import "styles";
</style>
