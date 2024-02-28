<template>
  <p class="font-bold mb-10">
    {{ $t("lang-13910017-20f7-43fd-a9a8-7dbcd2b474f0") }}
  </p>
  <p class="text mb-24">
    {{ $t("lang-e0326aaa-d508-49a7-b6f8-389a6a0d922b") }}
  </p>
  <SButton color="gray" class="add-button" @click="onOpenModal">
    <img src="../../../../shared/ui/assets/plus-icon.png" />
    <p>{{ $t("lang-af8b01aa-014b-421c-98fd-e68365f64cf4") }}</p></SButton
  >
  <PropertyCardList />
  <AddPropertyModal :value="modalValue" @close="onClose" />
</template>

<script lang="ts" setup>
import { SButton } from "@tumarsoft/ogogo-ui";
import AddPropertyModal from "@/features/category/add-property/ui/AddPropertyModal.vue";
import { PropertyCardList } from "@/entities/category/property-card-list";
import { ref } from "vue";

let modalValue = ref(false);

const onOpenModal = () => {
  modalValue.value = true;
};

const onClose = () => {
  modalValue.value = false;
};
</script>

<style scoped lang="scss">
.add-button {
  width: 100%;
  height: 52px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}
.text {
  color: #7c3aed;
}
</style>
