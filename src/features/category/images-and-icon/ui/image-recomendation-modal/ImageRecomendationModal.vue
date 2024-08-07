<template>
  <SModal v-model="isShow" width="640px" height="auto" @onClose="toggle">
    <p class="s-text-title-2 s-mb-5">
      {{ $t("lang-01eb9949-cc57-48b1-8ea3-554e39c1d8d9") }}
    </p>
    <p class="s-text-violet-600 s-mb-5">
      {{ $t("lang-8ea0acd3-e638-43b8-9ad0-ef49449d310c") }}
    </p>

    <div class="s-flex s-flex-grow s-items-center s-gap-6 s-mb-4">
      <img src="/icons/tv-accessories.jpg" />
      <p>{{ $t("lang-15510906-cb70-48cd-ba5c-3df148431e05") }}</p>
    </div>
    <div class="s-flex s-flex-grow s-items-center s-gap-6 s-mb-4">
      <img src="/icons/camera.jpg" />
      <p>{{ $t("lang-15d1a7b6-ec2c-4dfd-82ee-f40c10f2093f") }}</p>
    </div>
    <div class="s-flex s-flex-grow s-items-center s-gap-6 s-mb-4">
      <img src="/icons/mobile-phones.jpg" />
      <p>{{ $t("lang-741d2a8f-2aeb-49f6-a428-8cc016804910") }}</p>
    </div>
  </SModal>
</template>

<script lang="ts" setup>
import { SModal } from "@tumarsoft/ogogo-ui";
import { ref } from "vue";

const isShow = ref(false);

const toggle = () => {
  isShow.value = !isShow.value;
};

defineExpose({
  toggle,
});
</script>
