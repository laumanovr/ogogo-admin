<template>
  <SModal
    :isModalOpen="props.value"
    height="auto"
    @onClose="onClose"
    :width="'440px'"
  >
    <div class="add-property-modal-main-wrapper">
      <p class="font-bold">
        {{ $t("lang-13910017-20f7-43fd-a9a8-7dbcd2b474f0") }}
      </p>
      <SSelect
        :label="$t('lang-c9b8a310-7c1a-4936-9912-fc00c4d165d2')"
        class="w-p100"
      />
      <SCheckbox id="0" class="w-p100">
        {{ $t("lang-030b4140-be2c-482a-ba23-45c62ada7613") }}
      </SCheckbox>
      <SSelect
        :label="$t('lang-d5ed16f8-b6af-4c0a-ba0a-820cf3ce91ba')"
        class="w-p100"
      />
      <SSwitch labelPosition="left" class="switch-container">{{
        $t("lang-98b7ffed-5818-4f3e-b552-aa10e70616ee")
      }}</SSwitch>
      <SSwitch labelPosition="left" class="switch-container">{{
        $t("lang-1e1a6bdb-c17e-4089-ab17-e6d8c040203f")
      }}</SSwitch>
      <SSwitch labelPosition="left" class="switch-container">{{
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
  width: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}
.buttons-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.switch-container {
  width: 100%;
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
