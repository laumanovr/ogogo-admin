<template>
  <SModal
    :isModalOpen="props.value"
    width="100"
    height="auto"
    @onClose="onClose"
  >
    <div class="add-property-modal-main-wrapper">
      <p class="font-bold mb-10">
        {{ $t("lang-474c7de3-c095-4ac4-b222-2cf17b6d5343") }}
      </p>
      <p class="text mb-10">
        {{ $t("lang-6d09ed42-5da2-4bef-a54f-3a2f23735af1") }}
      </p>
      <div class="buttons-container d-flex justify-end gap-12">
        <SButton color="gray" class="button" @click="onClose">
          {{ $t("lang-c66fcd83-27ea-4c39-a1e9-be9c01dfdb36") }}</SButton
        >
        <SButton color="violet" class="button" @click="onSave">
          {{ $t("lang-af8b01aa-014b-421c-98fd-e68365f64cf4") }}</SButton
        >
      </div>
    </div>
  </SModal>
</template>

<script setup lang="ts">
import { SButton, SModal } from "@tumarsoft/ogogo-ui";

const props = defineProps({
  value: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close", "save"]);

const onClose = () => {
  emit("close", false);
};

const onSave = () => {
  emit("save", true);
};
</script>

<style></style>
