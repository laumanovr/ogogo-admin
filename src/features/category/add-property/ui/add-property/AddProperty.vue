<template>
  <SButton color="gray" class="add-button" @click="onOpenModal">
    <img src="/icons/plus-icon.png" />
    <p>{{ $t("lang-af8b01aa-014b-421c-98fd-e68365f64cf4") }}</p></SButton
  >
  <AddPropertyModal :value="modalValue" @close="onCloseModal" />
</template>

<script lang="ts" setup>
import { SButton } from "@tumarsoft/ogogo-ui";
import { AddPropertyModal } from "@/features/category/add-property";
import { ref } from "vue";

const modalValue = ref(false);

const onOpenModal = () => {
  modalValue.value = true;
};

const onCloseModal = () => {
  modalValue.value = false;
};
</script>

<style scoped lang="scss">
@import "styles";
</style>
