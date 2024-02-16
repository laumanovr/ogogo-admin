<template>
  <SModal
    :isModalOpen="props.value"
    width="100"
    height="auto"
    @onClose="onClose"
  >
    <div class="add-property-modal-main-wrapper">
      <p class="font-bold">
        {{ $t("lang-13910017-20f7-43fd-a9a8-7dbcd2b474f0") }}
      </p>
      <p class="text">
        {{ $t("lang-e0326aaa-d508-49a7-b6f8-389a6a0d922b") }}
      </p>
      <SSelect :label="$t('lang-c9b8a310-7c1a-4936-9912-fc00c4d165d2')" />
      <SCheckbox id="0">
        {{ $t("lang-030b4140-be2c-482a-ba23-45c62ada7613") }}
      </SCheckbox>
      <SSelect :label="$t('lang-d5ed16f8-b6af-4c0a-ba0a-820cf3ce91ba')" />
      <SSwitch id="1" labelPosition="left">{{
        $t("lang-98b7ffed-5818-4f3e-b552-aa10e70616ee")
      }}</SSwitch>
      <SSwitch id="2">{{
        $t("lang-1e1a6bdb-c17e-4089-ab17-e6d8c040203f")
      }}</SSwitch>
      <SSwitch id="3">{{
        $t("lang-4ae87450-36ee-4e92-a2a1-071898911d00")
      }}</SSwitch>
      <div class="buttons-container">
        <SButton color="gray" class="button" @click="onClose">
          {{ $t("lang-c66fcd83-27ea-4c39-a1e9-be9c01dfdb36") }}</SButton
        >
        <SButton color="violet" class="button">
          {{ $t("lang-d0108c3e-9945-4245-a730-b011e5a47c35") }}</SButton
        >
      </div>
    </div>
  </SModal>
</template>

<script lang="ts" setup>
import {
  SButton,
  SModal,
  SSelect,
  SCheckbox,
  SSwitch,
} from "@tumarsoft/ogogo-ui";

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

<style scoped lang="scss">
.add-property-modal-main-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}
.buttons-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

// .add-button {
//   width: 100%;
//   height: 52px;
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   gap: 10px;
// }
.button {
  width: 49%;
}
.text {
  color: #7c3aed;
}
</style>
