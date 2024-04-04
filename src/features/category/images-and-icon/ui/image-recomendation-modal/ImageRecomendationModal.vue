<template>
  <SModal
    :isModalOpen="props.value"
    width="640px"
    height="auto"
    @onClose="onClose"
  >
    <p class="font-bold mb-24 font-size-24">
      {{ $t("lang-01eb9949-cc57-48b1-8ea3-554e39c1d8d9") }}
    </p>
    <p class="color-violet-600 mb-24">
      {{ $t("lang-8ea0acd3-e638-43b8-9ad0-ef49449d310c") }}
    </p>

    <div class="d-flex flex-row items-center gap-24 mb-16">
      <img src="/icons/tv-accessories.jpg" />
      <p>{{ $t("lang-15510906-cb70-48cd-ba5c-3df148431e05") }}</p>
    </div>
    <div class="d-flex flex-row items-center gap-24 mb-16">
      <img src="/icons/camera.jpg" />
      <p>{{ $t("lang-15d1a7b6-ec2c-4dfd-82ee-f40c10f2093f") }}</p>
    </div>
    <div class="d-flex flex-row items-center gap-24 mb-16">
      <img src="/icons/mobile-phones.jpg" />
      <p>{{ $t("lang-741d2a8f-2aeb-49f6-a428-8cc016804910") }}</p>
    </div>
  </SModal>
</template>

<script lang="ts" setup>
import { SModal } from "@tumarsoft/ogogo-ui";

const props = defineProps({
  value: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["close"]);

const onClose = () => {
  emit("close", false);
};
</script>
