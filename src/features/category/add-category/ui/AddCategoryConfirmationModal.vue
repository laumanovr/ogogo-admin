<template>
  <SModal v-model="props.value" width="100px" height="auto" @onClose="onClose">
    <div class="add-property-modal-main-wrapper">
      <p class="s-text-title-2 s-mb-2">
        {{ $t("lang-474c7de3-c095-4ac4-b222-2cf17b6d5343") }}
      </p>
      <p class="text s-mb-2">
        {{ $t("lang-6d09ed42-5da2-4bef-a54f-3a2f23735af1") }}
      </p>
      <div
        class="buttons-container s-flex s-justify-end s-gap-12 s-mt-12 light"
      >
        <SButton class="button" @click="onClose">
          {{ $t("lang-c66fcd83-27ea-4c39-a1e9-be9c01dfdb36") }}
        </SButton>
        <SButton class="button" @click="onSave">
          {{ $t("lang-af8b01aa-014b-421c-98fd-e68365f64cf4") }}
        </SButton>
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
